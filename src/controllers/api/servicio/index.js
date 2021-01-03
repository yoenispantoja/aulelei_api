/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:47
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:28:03
 * @ Description: Rutas de la entidad Servicio
 */

import { check, param } from 'express-validator';
import { BaseRouter } from '../../base/BaseRouter';
import { catchAsync, validate } from '../../base/util/utils';
import { ServicioService } from './lib';
import { Search } from '../../../db/models/search';
import MStorage from '../../base/storage';

const servicioService = new ServicioService();

export class ServicioRouter extends BaseRouter {
  mstorage = new MStorage();
  constructor() {
    super();
    this.router.get('/', catchAsync(this.getAll));
	this.router.get('/resumen', catchAsync(this.getResumen));
    this.router.get('/categorias', catchAsync(this.getCategoriasServicio));
    this.router.get('/categoria/:id', catchAsync(this.getByCategoriaId));
    this.router.get('/:id', catchAsync(this.getById));
    this.router.delete('/:id', this.authJwt, catchAsync(this.delete));
    this.router.post('/', this.authJwt, this.mstorage.upload.single('avatar'), catchAsync(this.add));
    this.router.put('/:id', this.authJwt, this.mstorage.upload.single('avatar'), catchAsync(this.update));
  }

  async getAll(_, res) {
    const data = await servicioService.getAll();
    res.send(new Search(200, 'Success', 'Success', data));
  }
  
  async getResumen(_, res) {
    const data = await servicioService.getResumen();
    res.send(new Search(200, 'Success', 'Success', data));
  }

  async getById(req, res) {
    const data = await servicioService.getById(req.params.id);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
  }

  async getCategoriasServicio(_, res) {
    const data = await servicioService.getCategoriasServicio();
    res.send(new Search(200, 'Success', data ? 'Success' : 'Success', data));
  }

  //Devolver los servicios de una categoría determinada
  async getByCategoriaId(req, res) {
    const data = await servicioService.getByCategoriaId(req.params.id);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
  }

  async add(req, res) {
    const servicioData = JSON.parse(req.body.datos);
    const data = await servicioService.add(servicioData, req.file); //Esto ejecuta el método del servicio y devuelve la media insertada
    res.send(new Search(200, 'Success', 'Servicio insertado correctamente', data));
  }

  async update(req, res) {
    //Aseguro que venga todo bien validado desde el frontEnd antes de mandar los datos al servicio
    const servicioData = JSON.parse(req.body.datos);
    const data = await servicioService.update(req.params.id, servicioData, req.file); //Esto ejecuta el método del servicio y devuelve la publicación insertada
    res.send(new Search(200, 'Success', 'Servicio actualizado correctamente', data));
  }

  async delete(req, res) {
    // validations
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
    ]);

    const data = await servicioService.remove(req.params.id);
    if (!data) res.sendStatus(404);
    return res.send(new Search(200, 'Success', 'Servicio deleted.', null));
  }
}
