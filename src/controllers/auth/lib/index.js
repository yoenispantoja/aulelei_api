import * as bcrypt from 'bcryptjs';
import db from '../../../db/entities';
import {
  InvalidEmailAddress,
  AuthError,
  BadRequestError,
  NotAuthorized,
  UserAlreadyExist,
  SocialAuthError,
} from '../../../util/error';
import { getJwtToken } from '../../../config/jwt-config';
import { UserService, passwordSaltLengthForHash } from '../../api/user/lib';
import { sendWelcomeEmail, sendWelcomeAgainEmail, sendEmail } from '../../../util/mail';
import { generateRandomNum } from '../../base/util/utils';
import { validarGoogleToken } from '../../../config/social-auth-config';

const userService = new UserService();

export class AuthService {
  async handleSession(userId, role) {
    const session = await db.Session.findOne({
      where: {
        userId,
        active: true,
      },
    });
    if (session) return session.token;

    const token = getJwtToken(userId, role);

    await db.sequelize.transaction(async (transaction) => {
      // desactivamos las sesiones anteriores
      await db.Session.update(
        {
          active: false,
        },
        {
          where: {
            userId,
          },
          transaction,
        }
      );

      // creamos la nueva sesion
      await db.Session.create(
        {
          token,
          userId,
        },
        {
          transaction,
        }
      );
    });

    return token;
  }

  async login(userData) {
    const { email, password, provider, tokenGoogle, tokenFacebook } = userData;

    const exists = await db.User.findOne({
      where: {
        email,
        active: true,
      },
      include: ['rol'],
    });

    if (!exists) throw new InvalidEmailAddress(email, 'User');

    //Chequeando si viene con el tokenGoogle
    if (provider==='google') {
      validarGoogleToken(token).then((ticket) => {
        try {
          const payload = ticket.getPayload();
          const email = payload['email'];
        } catch (error) {
          //throw new SocialAuthError('Error de acceso con las credenciales de Google');
        }
      }).catch(error => {
          console.log(error);
      });
    }
    //Chequeando si viene con token de Facebook
    else if (provider==='facebook') {

    } else {
      if (!(await bcrypt.compare(String(password), exists.password))) throw new AuthError();
    }

    //Determino el id y el rol del usuario autenticado
    const idRol = exists.rolId;

    //Creo el profile para guardarlo en la sessión
    let profile = await db.Rol.findOne({
      where: {
        id: idRol,
      },
    });

    if (!profile) throw new NotAuthorized();

    const token = await this.handleSession(exists['dataValues'].id, idRol);

    return [exists['dataValues'], token];
  }

  async registrarUsuario(datosUsuario) {
    //Esto es solo un trampolín para organizar mejor las responsabilidades
    const cliente = userService.add(datosUsuario);
    return cliente;
  }

  async logout(token) {
    await db.Session.update(
      {
        active: false,
      },
      {
        where: {
          token,
        },
      }
    );
    return true;
  }

  async reset(email) {
    if (!userService.getByEmail(email)) throw new InvalidEmailAddress(email, 'User');
    const password = generateRandomNum(8);
    const finalPwd = await bcrypt.hash(password, passwordSaltLengthForHash);
    await db.User.update(
      {
        password: finalPwd,
      },
      {
        where: {
          email,
        },
      }
    );
    sendEmail(
      email,
      'Forgot password request',
      `<h2>We've received you forgot password request</h2>
			<p>Please, use the following password to login to Marathon Kids</p>
			<p>Email: ${email}</p>
			<p>New Password: ${password}</p>
			`
    );
    return true;
  }

  async changePassword(email, newPassword) {
    if (!userService.getByEmail(email)) throw new InvalidEmailAddress(email, 'User');
    const finalPwd = await bcrypt.hash(newPassword, passwordSaltLengthForHash);
    await db.User.update(
      {
        password: finalPwd,
      },
      {
        where: {
          email,
        },
      }
    );
    sendEmail(
      email,
      'Your password has been updated.',
      `<h2>Your password has been successfully changed.</h2>
			`
    );
    return true;
  }
}
