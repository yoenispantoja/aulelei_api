/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:47
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:30:34
 * @ Description: Rutas de la entidad Evento
 */

import { check, param } from 'express-validator';
import { BaseRouter } from '../../base/BaseRouter';
import { catchAsync, validate } from '../../base/util/utils';
import { EventoService } from './lib';
import { Search } from '../../../db/models/search';
import MStorage from '../../base/storage';

const eventoService = new EventoService();

export class EventoRouter extends BaseRouter {
  mstorage = new MStorage();
  constructor() {
    super();
    this.router.get('/', catchAsync(this.getAll));
    this.router.get('/:id', catchAsync(this.getById));
    this.router.delete('/:id', this.authJwt, catchAsync(this.delete));
    this.router.post('/', this.authJwt, this.mstorage.upload.single('imagenPortada'), catchAsync(this.add));
    this.router.put('/:id', this.authJwt, this.mstorage.upload.single('imagenPortada'), catchAsync(this.update));
  }

  async getAll(_, res) {
    const data = await eventoService.getAll();
    res.send(new Search(200, 'Success', 'Success', data));
  }

  async getById(req, res) {
    const data = await eventoService.getById(req.params.id);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
  }

  async add(req, res) {
    const eventoData = JSON.parse(req.body.datos);
    const data = await eventoService.add(eventoData, req.file); //Esto ejecuta el método del servicio y devuelve la media insertada
    res.send(new Search(200, 'Success', 'Evento insertado correctamente', data));
  }

  async update(req, res) {
    //Aseguro que venga todo bien validado desde el frontEnd antes de mandar los datos al servicio
    const eventoData = JSON.parse(req.body.datos);
    const data = await eventoService.update(req.params.id, eventoData, req.file); //Esto ejecuta el método del servicio y devuelve la publicación insertada
    res.send(new Search(200, 'Success', 'Evento actualizado correctamente', data));
  }

  async delete(req, res) {
    // validations
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
    ]);

    const data = await eventoService.remove(req.params.id);
    if (!data) res.sendStatus(404);
    return res.send(new Search(200, 'Success', 'Evento deleted.', null));
  }
}
