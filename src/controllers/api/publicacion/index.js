/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:47
 * @ Modified by: Your name
 * @ Modified time: 2020-05-31 18:46:36
 * @ Description: Rutas de la entidad Publicacion
 */

import { check, param } from 'express-validator';
import { BaseRouter } from '../../base/BaseRouter';
import { catchAsync, validate } from '../../base/util/utils';
import { PublicacionService } from './lib';
import MStorage from '../../base/storage';
import { Search } from '../../../db/models/search';

const publicacionService = new PublicacionService();

export class PublicacionRouter extends BaseRouter {
  mstorage = new MStorage();

  constructor() {
    super();
    this.router.get('/', catchAsync(this.getAll));
    this.router.get('/:id', catchAsync(this.getById));
    this.router.post('/comentario', this.authJwt, catchAsync(this.insertarComentario));
    this.router.post(
      '/',
      this.authJwt, //Esto viene de la clase Base (para el acceso autorizado)
      this.mstorage.upload.single('imagenDestacada'),
      catchAsync(this.add)
    );
    this.router.post(
      '/upload_image_post',
      this.authJwt,
      this.mstorage.upload.single('imagenPost'),
      catchAsync(this.addImagenPost)
    );
    //Edición de comentarios
    this.router.put('/comentario/:id', this.authJwt, catchAsync(this.updateComentario));
    this.router.delete('/comentario/:id', this.authJwt, catchAsync(this.deleteComentario));
    this.router.put('/:id', this.authJwt, this.mstorage.upload.single('imagenDestacada'), catchAsync(this.update));
    this.router.delete('/:id', this.authJwt, catchAsync(this.delete));
  }

  async getAll(_, res) {
    const data = await publicacionService.getAll();
    res.send(new Search(200, 'Success', 'Success', data));
  }

  async getById(req, res) {
    const data = await publicacionService.getById(req.params.id);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
  }

  async add(req, res) {
    //Aseguro que venga todo bien validado desde el frontEnd antes de mandar los datos al servicio
    const publicacionData = JSON.parse(req.body.datos);
    const data = await publicacionService.add(publicacionData, req.file); //Esto ejecuta el método del servicio y devuelve la publicación insertada
    res.send(new Search(200, 'Success', 'Publicación insertada correctamente', data));
  }

  async addImagenPost(req, res) {
    const data = await publicacionService.addImagenPost(req.file);
    res.send(new Search(200, 'Success', 'Publicación insertada correctamente', data));
  }

  async insertarComentario(req, res) {
    const comentarioData = req.body;
    const data = await publicacionService.insertarComentario(comentarioData);
    res.send(new Search(200, 'Success', 'Comentario insertado correctamente', data));
  }

  async updateComentario(req, res) {
    const comentarioData = JSON.parse(req.body.datos);
    const data = await publicacionService.updateComentario(req.params.id, comentarioData);
    res.send(new Search(200, 'Success', 'Comentario actualizado correctamente', data));
  }

  async deleteComentario(req, res) {
    // validations
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
    ]);

    const data = await publicacionService.removeComentario(req.params.id);
    if (!data) res.sendStatus(404);
    return res.send(new Search(200, 'Success', 'Comentario deleted.', null));
  }

  async update(req, res) {
    //Aseguro que venga todo bien validado desde el frontEnd antes de mandar los datos al servicio
    const publicacionData = JSON.parse(req.body.datos);
    const data = await publicacionService.update(req.params.id, publicacionData, req.file); //Esto ejecuta el método del servicio y devuelve la publicación insertada
    res.send(new Search(200, 'Success', 'Publicación actualizada correctamente', data));
  }

  async delete(req, res) {
    // validations
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
    ]);

    const data = await publicacionService.remove(req.params.id);
    if (!data) res.sendStatus(404);
    return res.send(new Search(200, 'Success', 'Publicación deleted.', null));
  }
}
