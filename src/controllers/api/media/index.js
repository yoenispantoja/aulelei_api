/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:47
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:29:41
 * @ Description: Rutas de la entidad Media
 */

import { check, param } from 'express-validator';
import { BaseRouter } from '../../base/BaseRouter';
import { catchAsync, validate } from '../../base/util/utils';
import { MediaService } from './lib';
import MStorage from '../../base/storage';
import { Search } from '../../../db/models/search';

const mediaService = new MediaService();

export class MediaRouter extends BaseRouter {
  mstorage = new MStorage();
  constructor() {
    super();
    this.router.get('/', catchAsync(this.getAll));
    this.router.get('/:id', catchAsync(this.getById));
    this.router.delete('/:id', this.authJwt, catchAsync(this.delete));
    this.router.post('/', this.authJwt, this.mstorage.upload.single('file'), catchAsync(this.add));
  }

  async getAll(_, res) {
    const data = await mediaService.getAll();
    res.send(new Search(200, 'Success', 'Success', data));
  }

  async getById(req, res) {
    const data = await mediaService.getById(req.params.id);
    res.send(new Search(200, 'Success', data ? 'Success' : 'Id not found', data));
  }

  async add(req, res) {
    const data = await mediaService.add(req.file); //Esto ejecuta el método del servicio y devuelve la media insertada
    res.send(new Search(200, 'Success', 'Media insertada correctamente', data));
  }

  async delete(req, res) {
    // validations
    await validate(req, res, [
      param('id')
        .isNumeric()
        .notEmpty(),
    ]);

    const data = await mediaService.remove(req.params.id);
    if (!data) res.sendStatus(404);
    return res.send(new Search(200, 'Success', 'Media deleted.', null));
  }
}
