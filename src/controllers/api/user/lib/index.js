import * as bcrypt from 'bcryptjs';
import { Item } from '../../../../db/models/user';
import { Item2 } from '../../../../db/models/rol';
import db from '../../../../db/entities';
import { UserAlreadyExist, SocialAuthError } from '../../../../util/error';
const { Op } = require("sequelize");
import { saveFile } from '../../../../util/file-upload';
const path = require('path');

export const passwordSaltLengthForHash = 10;

export class UserService {
  async getAll() {
    const users = await db.User.findAll({
      where: {
        id: {
			[Op.not]: 1
		 }
	  },
      include: {
        model: db.Rol,
        as: 'rol',
      },
    });
    return users;
  }

  async getById(id, transaction = undefined) {
    const user = await db.User.findOne({
      where: {
        id,
        active: true,
      },
      include: {
        model: db.Rol,
        as: 'rol',
      },
      transaction,
    });
    return user ;
  }

  async getByEmail(email) {
    if (!email) return false;
    const user = await db.User.findOne({
      where: {
        email,
        active: true,
      },
      include: {
        model: db.Rol,
        as: 'rol',
      },
    });
    return user;
  }

  //Traer un usuario por un rol específico
  async getByRol(rolId, transaction = undefined) {
    const usuarios = await db.User.findAll({
      where: {
        rolId,
      },
      include: {
        model: db.Rol,
        as: 'rol',
      },
      transaction,
    });

    return usuarios;
  }

  //Traer los roles
  async getRoles() {
    const roles = await db.Rol.findAll();
    return roles;
  }

  //registrar un nuevo usuario (si viene una imagen y un valor verdadero en google, es un registro por red social)
  async add(userData, transaction = undefined) {
    const { nombre, email, password, img, provider } = userData;

    const exists = await this.getByEmail(email);

    if (exists) throw new UserAlreadyExist(email);

    //Si no viene con credenciales de Google genero un password y le pongo nula la foto
    let google = 1;
    let finalPassword = password;
    let finalImagen = img;

    if (!provider) {
      finalPassword = await bcrypt.hashSync(password, passwordSaltLengthForHash);
      finalImagen = 'default.png';
      google = 0;
    }

    const newUser = await db.User.create(
      {
        nombre,
        email,
        password: finalPassword,
        img: finalImagen,
        google,
        rolId: 6,
      },
      {
        transaction,
      }
    );

    return this.getById(newUser.id, transaction);
  }

  async update(id, userData, fotoUser) {
    const { nombre, email, imagenUsuario, active, rolId } = userData;
    const pathImg = path.resolve(__dirname, `../../../../../public/usuarios/${id}`);
    //Si es que viene imagen para actualizar
    if (imagenUsuario.length > 0) {
      //Trabajando el nombre de la imagen
      const archivo = fotoUser.originalname;
      const nombreArchivoCortado = archivo.split('.');
      const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
      const randomText = Math.random()
        .toString(36)
        .substring(7);
      const nombreArchivo = `usuario-${randomText}-${new Date().getMilliseconds()}.${extension}`;
      await db.User.update(
        {
          nombre,
          email,
          img: nombreArchivo,
          active,
          rolId
        },
        {
          where: {
            id,
          },
        }
      );

      //Utilizando el utilitario file-upload
      saveFile(pathImg, fotoUser, nombreArchivo);
    } else {
      await db.User.update(
        {
          nombre,
          email,
          active,
          rolId
        },
        {
          where: {
            id,
          },
        }
      );
    }
    return this.getById(id);
  }


  async remove(id) {
	return await db.User.destroy({
      where: {
        id,
      },
    });
  }
}
