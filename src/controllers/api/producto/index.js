/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:47
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:28:55
 * @ Description: Rutas de la entidad Producto
 */

import { check, param } from 'express-validator';
import { BaseRouter } from '../../base/BaseRouter';
import { catchAsync, validate } from '../../base/util/utils';
import { ProductoService } from './lib';
import { Search } from '../../../db/models/search';
import MStorage from '../../base/storage';

const productoService = new ProductoService();

export class ProductoRouter extends BaseRouter {
  mstorage = new MStorage();
  constructor() {
    super();
    this.router.get('/', catchAsync(this.getAll));
    this.router.get('/categorias', catchAsync(this.getCategoriasProducto));
	this.router.get('/codigo/:codigo', catchAsync(this.getProductoPorCodigo));
    this.router.get('/categoria/:id', catchAsync(this.getByCategoriaId));
    this.router.get('/:id', catchAsync(this.getById));
    this.router.delete('/:id', this.authJwt, catchAsync(this.delete));
    this.router.post('/', this.authJwt, this.mstorage.upload.single('avatar'), catchAsync(this.add));
    this.router.put('/:id', this.authJwt, this.mstorage.upload.single('avatar'), catchAsync(this.update));
  }

  async getAll(_, res) {
    const data = await productoService.getAll();
    res.send(new Search(200, 'Success', 'Success', data));
  }

  async getById(req, res) {
    const data = await productoService.getById(req.params.id);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
  }

  async getCategoriasProducto(_, res) {
    const data = await productoService.getCategoriasProducto();
    res.send(new Search(200, 'Success', data ? 'Success' : 'Success', data));
  }

  //Buscar producto por un código determinado
  async getProductoPorCodigo(req, res) {
    const data = await productoService.getProductoPorCodigo(req.params.codigo);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Codigo no encontrado', data));
  }
  
  //Devolver los productos de una categoría determinada
  async getByCategoriaId(req, res) {
    const data = await productoService.getById(req.params.categoria);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
  }

  async add(req, res) {
    const productoData = JSON.parse(req.body.datos);
    const data = await productoService.add(productoData, req.file); //Esto ejecuta el método del producto y devuelve la media insertada
    res.send(new Search(200, 'Success', 'Producto insertado correctamente', data));
  }

  async update(req, res) {
    //Aseguro que venga todo bien validado desde el frontEnd antes de mandar los datos al producto
    const productoData = JSON.parse(req.body.datos);
    const data = await productoService.update(req.params.id, productoData, req.file); //Esto ejecuta el método del producto y devuelve la publicación insertada
    res.send(new Search(200, 'Success', 'Producto actualizado correctamente', data));
  }

  async delete(req, res) {
    // validations
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
    ]);

    const data = await productoService.remove(req.params.id);
    if (!data) res.sendStatus(404);
    return res.send(new Search(200, 'Success', 'Producto deleted.', null));
  }
}
