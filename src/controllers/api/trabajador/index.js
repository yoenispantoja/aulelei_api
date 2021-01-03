/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:47
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:27:19
 * @ Description: Rutas de la entidad Trabajador
 */

import { check, param } from 'express-validator';
import { BaseRouter } from '../../base/BaseRouter';
import { catchAsync, validate } from '../../base/util/utils';
import { TrabajadorService } from './lib';
import { Search } from '../../../db/models/search';
import MStorage from '../../base/storage';

const trabajadorService = new TrabajadorService();

export class TrabajadorRouter extends BaseRouter {
  mstorage = new MStorage();
  constructor() {
    super();
    this.router.get('/', catchAsync(this.getAll));
    this.router.get('/turnos_servicio', this.authJwt, catchAsync(this.getTurnosServicio));
    this.router.get('/categoria/:id', catchAsync(this.getByCategoriaId));
    this.router.get('/:id', catchAsync(this.getById));
    this.router.delete('/:id', this.authJwt, catchAsync(this.delete));
    this.router.post('/', this.authJwt, catchAsync(this.add));
    this.router.put('/:id', this.authJwt, catchAsync(this.update));
  }

  async getAll(_, res) {
    const data = await trabajadorService.getAll();
    res.send(new Search(200, 'Success', 'Success', data));
  }

  async getById(req, res) {
    const data = await trabajadorService.getById(req.params.id);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
  }

  async getCategoriasTrabajador(req, res) {
    const data = await trabajadorService.getCategoriasTrabajador();
    res.send(new Search(200, 'Success', data ? 'Correcto' : 'Success', data));
  }

  //Devuelve todos los turnos de servicio
  async getTurnosServicio(_, res) {
    const data = await trabajadorService.getTurnosServicio();
    res.send(new Search(200, 'Success', data ? 'Success' : 'Success', data));
  }

  //Devolver los trabajadors de una categoría determinada
  async getByCategoriaId(req, res) {
    const data = await trabajadorService.getById(req.params.categoria);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
  }

  async add(req, res) {
    const data = await trabajadorService.add(req.body); 
    res.send(new Search(200, 'Success', 'Trabajador insertado correctamente', data));
  }

  async update(req, res) {
    const data = await trabajadorService.update(req.params.id, req.body); 
    res.send(new Search(200, 'Success', 'Trabajador actualizado correctamente', data));
  }

  async delete(req, res) {
    // validations
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
    ]);

    const data = await trabajadorService.remove(req.params.id);
    if (!data) res.sendStatus(404);
    return res.send(new Search(200, 'Success', 'Trabajador deleted.', null));
  }
}
