/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:47
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:30:51
 * @ Description: Rutas de la entidad EstadoPublicacion
 */

import { check, param } from 'express-validator';
import { BaseRouter } from '../../base/BaseRouter';
import { catchAsync, validate } from '../../base/util/utils';
import { EstadoPublicacionService } from './lib';
import { Search } from '../../../db/models/search';

const estadoPublicacionService = new EstadoPublicacionService();

export class EstadoPublicacionRouter extends BaseRouter {
  constructor() {
    super();
    this.router.get('/', catchAsync(this.getAll));
    this.router.get('/:id', catchAsync(this.getById));
    this.router.post('/', this.authJwt, catchAsync(this.add));
    this.router.put('/:id', this.authJwt, catchAsync(this.update));
    this.router.delete('/:id', this.authJwt, catchAsync(this.delete));
  }

  async getAll(_, res) {
    const data = await estadoPublicacionService.getAll();
    res.send(new Search(200, 'Success', 'Success', data));
  }

  async getById(req, res) {
    const data = await estadoPublicacionService.getById(req.params.id);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
  }

  async add(req, res) {
    //Aseguro que venga todo bien validado desde el frontEnd antes de mandar los datos al servicio
    await validate(req, res, [check(['estadoPublicacion.nombre', 'estadoPublicacion.descripcion']).notEmpty()]);
    const data = await estadoPublicacionService.add(req.body.estadoPublicacion); //Esto ejecuta el método del servicio y devuelve la estado insertada
    res.send(new Search(200, 'Success', 'Estado insertada correctamente', data));
  }

  async update(req, res) {
    //Aseguro que venga todo bien validado desde el frontEnd antes de mandar los datos al servicio
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
      check(['estadoPublicacion.nombre', 'estadoPublicacion.descripcion']).notEmpty(),
    ]);
    const data = await estadoPublicacionService.update(req.params.id, req.body.estadoPublicacion); //Esto ejecuta el método del servicio y devuelve la estado insertada
    res.send(new Search(200, 'Success', 'Estado insertada correctamente', data));
  }

  async delete(req, res) {
    // validations
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
    ]);

    const data = await estadoPublicacionService.remove(req.params.id);
    if (!data) res.sendStatus(404);
    return res.send(new Search(200, 'Success', 'EstadoPublicacion deleted.', null));
  }
}
