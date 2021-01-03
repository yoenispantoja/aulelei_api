import { check, param } from 'express-validator';
import { BaseRouter } from '../../base/BaseRouter';
import { catchAsync, validate } from '../../base/util/utils';
import { UserService } from './lib';
import MStorage from '../../base/storage';
import { Search } from '../../../db/models/search';

const userService = new UserService();

export class UserRouter extends BaseRouter {
         mstorage = new MStorage();
         constructor() {
           super();
             this.router.get('/', this.authJwt, catchAsync(this.getAll));
             this.router.get('/roles', this.authJwt,catchAsync(this.getRoles));
             this.router.get('/rol/:id', catchAsync(this.getByRol));
             this.router.get('/:id', this.authJwt, catchAsync(this.getById));
             this.router.put('/:id', this.authJwt, this.mstorage.upload.single('avatar'), catchAsync(this.patch));
             this.router.delete('/:id', this.authJwt, catchAsync(this.delete));
         }

         //Subiendo a Heroku4
         async getAll(_, res) {
           const data = await userService.getAll();
           res.send(new Search(200, 'Success', 'Success', data));
         }

         async getById(req, res) {
           const data = await userService.getById(req.params.id);
           res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
         }

         //Devolver los usuarios de un rol determinado
         async getByRol(req, res) {
           const data = await userService.getByRol(req.params.id);
           res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
         }

         //Devolver todos los roles
         async getRoles(_, res) {
           const data = await userService.getRoles();
           res.send(new Search(200, 'Success','Success', data));
         }


         async patch(req, res) {
           const userData = JSON.parse(req.body.datos);
           const data = await userService.update(req.params.id, userData, req.file);
           if (!data) return res.sendStatus(404);
           return res.send(data);
         }

         async delete(req, res) {
           // validations
           await validate(req, res, [
             param('id')
               .isNumeric()
               .notEmpty(),
           ]);

           const data = await userService.remove(req.params.id);
           if (!data) res.sendStatus(404);
           return res.send(new Search(200, 'Success', 'User deleted.', null));
         }
       }