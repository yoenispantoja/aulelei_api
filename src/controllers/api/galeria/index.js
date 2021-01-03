/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:47
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:29:58
 * @ Description: Rutas de la entidad Galeria
 */

import { check, param } from 'express-validator';
import { BaseRouter } from '../../base/BaseRouter';
import { catchAsync, validate } from '../../base/util/utils';
import { GaleriaService } from './lib';
import MStorage from '../../base/storage';
import { Search } from '../../../db/models/search';

const galeriaService = new GaleriaService();

export class GaleriaRouter extends BaseRouter {
  mstorage = new MStorage();
  constructor() {
    super();
    this.router.get('/', catchAsync(this.getAll));
    this.router.get('/categorias', catchAsync(this.getCategoriasGalerias));
    this.router.get('/estados', catchAsync(this.getEstadosGalerias));
    this.router.get('/:id', catchAsync(this.getById));
    this.router.post('/', this.authJwt, this.mstorage.upload.any(), catchAsync(this.add));
    this.router.put('/:id', this.authJwt, this.mstorage.upload.any(), catchAsync(this.update));
    this.router.delete('/imagen/:id', this.authJwt, catchAsync(this.deleteImagenes));
    this.router.delete('/:id', this.authJwt, catchAsync(this.delete));
  }

  async getAll(_, res) {
    const data = await galeriaService.getAll();
    res.send(new Search(200, 'Success', 'Success', data));
  }

  async getCategoriasGalerias(req, res) {
    const data = await galeriaService.getCategorias();
    res.send(new Search(200, 'Success', 'Success', data));
  }

  async getEstadosGalerias(req, res) {
    const data = await galeriaService.getEstados();
    res.send(new Search(200, 'Success', 'Success', data));
  }

  async getById(req, res) {
    const data = await galeriaService.getById(req.params.id);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
  }

  async add(req, res) {
    const galeriaData = JSON.parse(req.body.datos);
    const data = await galeriaService.add(galeriaData, req.files); //Esto ejecuta el método del servicio y devuelve la publicación insertada
    res.send(new Search(200, 'Success', 'Galeria insertada correctamente', data));
  }

  async update(req, res) {
    //Aseguro que venga todo bien validado desde el frontEnd antes de mandar los datos al servicio
    const galeriaData = JSON.parse(req.body.datos);
    const data = await galeriaService.update(req.params.id, galeriaData, req.files); //Esto ejecuta el método del servicio y devuelve la publicación insertada
    res.send(new Search(200, 'Success', 'Galería actualizada correctamente', data));
  }

  async deleteImagenes(req, res) {
    // validations
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
    ]);

    const data = await galeriaService.removeImagen(req.params.id);
    if (!data) res.sendStatus(404);
    return res.send(new Search(200, 'Success', 'Imagen deleted.', null));
  }

  async delete(req, res) {
    // validations
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
    ]);

    const data = await galeriaService.remove(req.params.id);
    if (!data) res.sendStatus(404);
    return res.send(new Search(200, 'Success', 'Galeria deleted.', null));
  }
}
