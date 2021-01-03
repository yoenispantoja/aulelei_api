import { check } from 'express-validator';
import { BaseRouter } from '../base/BaseRouter';
import { catchAsync, validate } from '../base/util/utils';
import { AuthService } from './lib';
import { Search } from '../../db/models/search';
import { sendWelcomeEmail, sendWelcomeAgainEmail, sendEmail } from '../../util/mail';

const authService = new AuthService();
export class AuthRouter extends BaseRouter {
    constructor() {
        super();
        this.router.post('/register', catchAsync(this.registrarUsuario));
        this.router.post('/login', catchAsync(this.login));
        this.router.post('/logout', catchAsync(this.logout));
        this.router.post('/reset', catchAsync(this.reset));
        this.router.post('/changePassword', catchAsync(this.changePassword));
    }

    async registrarUsuario(req, res) {

        const data = await authService.registrarUsuario(req.body.usuario);
        //Enviamos un correo de bienvenida al usuario
        // sendWelcomeEmail(data.email, 'Usuario');
        return res.send(new Search(200, 'Success', 'Usuario adicionado.', data));
    }

    async login(req, res) {
        // validations
        await validate(req, res, [
            check('usuario.email').isEmail().notEmpty(),
            check('usuario.password').notEmpty()
        ]);

        const [profile, token] = await authService.login(req.body.usuario);
        res.send(new Search(200, 'Success', 'User logged in', {...profile, token }));
    }

    async logout(req, res) {
        // validations
        await validate(req, res, [
            check('token').notEmpty()
        ]);

        const data = await authService.logout(req.body.token);
        res.send(new Search(200, 'Success', 'User logged out', data));
    }

    // Send new password by email.
    async reset(req, res) {
        // validations
        await validate(req, res, [
            check('user.email').notEmpty()
        ]);

        const data = await authService.reset(req.body.user.email);
        res.send(new Search(200, 'Success', 'New password sent to email', data));
    }

    // Change password
    async changePassword(req, res) {
        // validations
        await validate(req, res, [
            check('email').notEmpty().isEmail(),
            check('newPassword').notEmpty().isLength({ min: 8 }).matches(req.body.confirmNewPassword),
            check('confirmNewPassword').notEmpty().isLength({ min: 8 }).matches(req.body.newPassword)
        ]);
        const data = await authService.changePassword(req.body.email, req.body.newPassword);
        return res.send(new Search(200, 'Success', 'Password has been updated.', data));
    }
}