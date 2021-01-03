/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:47
 * @ Modified by: Your name
 * @ Modified time: 2020-05-11 23:02:25
 * @ Description: Rutas de la entidad Reserva
 */

import { check, param } from 'express-validator';
import { BaseRouter } from '../../base/BaseRouter';
import { catchAsync, validate } from '../../base/util/utils';
import { ReservaService } from './lib';
import { Search } from '../../../db/models/search';

const reservaService = new ReservaService();

export class ReservaRouter extends BaseRouter {
         constructor() {
           super();
           this.router.get('/', catchAsync(this.getAll));
           this.router.get('/trabajador/:id', catchAsync(this.getReservaTrabajadorId));
           this.router.get('/:id', catchAsync(this.getById));
           this.router.delete('/:id', this.authJwt, catchAsync(this.delete));
           this.router.post('/', catchAsync(this.add));
           this.router.put('/:id', this.authJwt, catchAsync(this.update));
         }

         async getAll(_, res) {
           const data = await reservaService.getAll();
           res.send(new Search(200, 'Success', 'Success', data));
         }

         async getById(req, res) {
           const data = await reservaService.getById(req.params.id);
           res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
         }

         //Devolver las reservas de un trabajador determinado
         async getReservaTrabajadorId(req, res) {
           const data = await reservaService.getReservaTrabajadorId(req.params.id);
           res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
         }

         async add(req, res) {
           //const reservaData = JSON.parse(req.body);
           const data = await reservaService.add(req.body); //Esto ejecuta el método del reserva y devuelve la media insertada
           res.send(new Search(200, 'Success', 'Reserva insertada correctamente', data));
         }

         async update(req, res) {
           //Aseguro que venga todo bien validado desde el frontEnd antes de mandar los datos al reserva
           
           const data = await reservaService.update(req.params.id, req.body); //Esto ejecuta el método del reserva y devuelve la reserva insertada
           res.send(new Search(200, 'Success', 'Reserva actualizada correctamente', data));
         }

         async delete(req, res) {
           // validations
           await validate(req, res, [
             param('id')
               .isNumeric()
               .notEmpty(),
           ]);

           const data = await reservaService.remove(req.params.id);
           if (!data) res.sendStatus(404);
           return res.send(new Search(200, 'Success', 'Reserva deleted.', null));
         }
       }
