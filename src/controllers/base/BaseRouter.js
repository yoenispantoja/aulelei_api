import { Router } from 'express';
// para el acceso
import { passportConfigureStrategy } from '../../../src/config/passport-config';

const passport = require('passport');

export class BaseRouter {

    constructor() {
        //este autjJwt lo emplearemos para cuando la ruta exija autorización
        /* Inicializa la autenticación con passport authentication */
        passportConfigureStrategy();
        passport.initialize();
        this.authJwt = passport.authenticate('jwt', { session: false });
        this.router = Router();
    }
}