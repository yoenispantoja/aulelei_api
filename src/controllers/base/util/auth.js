import { Item as User } from '../../../db/models/user';
import { RoleEnum } from './rol';

export const authAny = (req, res, next) => {
    const user = new User(req.user);
    if (!(user.role in RoleEnum)) {
        return res.status(401).end();
    }
    return next();
};
export const authAdministrador = (req, res, next) => {
    const user = new User(req.user);
    if (user.role !== RoleEnum.Administrador) {
        return res.status(401).end();
    }
    return next();
};
export const authCajero = (req, res, next) => {
    const user = new User(req.user);
    if (user.role !== RoleEnum.Cajero) {
        return res.status(401).end();
    }
    return next();
};
export const authEstilista = (req, res, next) => {
    const user = new User(req.user);
    if (user.role !== RoleEnum.Estilista) {
        return res.status(401).end();
    }
    return next();
};
export const authCliente = (req, res, next) => {
    const user = new User(req.user);
    if (user.role !== RoleEnum.Cliente) {
        return res.status(401).end();
    }
    return next();
};