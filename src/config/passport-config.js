import { Strategy } from 'passport-jwt';
import { jwtOptions } from './jwt-config';

import { error } from '../util/logger';
import { UserService } from '../controllers/api/user/lib';

const passport = require('passport');

const usuarioService = new UserService();

export const passportConfigureStrategy = () => {
    passport.use(
        new Strategy(jwtOptions, async(jwtPayload, done) => {
            try {

                const { id, role } = jwtPayload;

                if (!id) return done(null, false);
                const usuario = await usuarioService.getById(id);

                if (!usuario) return done(null, false, 'User not found');

                return done(null, {...usuario, role });

            } catch (e) {

                error(e);
                return done(e, null);
            }
        })
    );
};