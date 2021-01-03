/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:47
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:31:11
 * @ Description: Rutas de la entidad CategoriaPublicacion
 */

import { check, param } from 'express-validator';
import { BaseRouter } from '../../base/BaseRouter';
import { catchAsync, validate } from '../../base/util/utils';
import { CategoriaPublicacionService } from './lib';
import { Search } from '../../../db/models/search';

const categoriaPublicacionService = new CategoriaPublicacionService();

export class CategoriaPublicacionRouter extends BaseRouter {
  constructor() {
    super();
    this.router.get('/', catchAsync(this.getAll));
    this.router.get('/:id', catchAsync(this.getById));
    this.router.post('/', this.authJwt, catchAsync(this.add));
    this.router.put('/:id', this.authJwt, catchAsync(this.update));
    this.router.delete('/:id', this.authJwt, catchAsync(this.delete));
  }

  async getAll(_, res) {
    const data = await categoriaPublicacionService.getAll();
    res.send(new Search(200, 'Success', 'Success', data));
  }

  async getById(req, res) {
    const data = await categoriaPublicacionService.getById(req.params.id);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
  }

  async add(req, res) {
    //Aseguro que venga todo bien validado desde el frontEnd antes de mandar los datos al servicio
    await validate(req, res, [check(['categoriaPublicacion.nombre', 'categoriaPublicacion.descripcion']).notEmpty()]);
    const data = await categoriaPublicacionService.add(req.body.categoriaPublicacion); //Esto ejecuta el método del servicio y devuelve la categoria insertada
    res.send(new Search(200, 'Success', 'Categoria insertada correctamente', data));
  }

  async update(req, res) {
    //Aseguro que venga todo bien validado desde el frontEnd antes de mandar los datos al servicio
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
      check(['categoriaPublicacion.nombre', 'categoriaPublicacion.descripcion']).notEmpty(),
    ]);
    const data = await categoriaPublicacionService.update(req.params.id, req.body.categoriaPublicacion); //Esto ejecuta el método del servicio y devuelve la categoria insertada
    res.send(new Search(200, 'Success', 'Categoria insertada correctamente', data));
  }

  async delete(req, res) {
    // validations
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
    ]);

    const data = await categoriaPublicacionService.remove(req.params.id);
    if (!data) res.sendStatus(404);
    return res.send(new Search(200, 'Success', 'CategoriaPublicacion deleted.', null));
  }
}
