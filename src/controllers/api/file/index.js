import { check } from 'express-validator';
import { FileService } from './lib';
import { BaseRouter } from '../../base/BaseRouter';
import { catchAsync, validate } from '../../base/util/utils';

const fileService = new FileService();
export class FileRouter extends BaseRouter {
  constructor() {
    super();
    this.router.post('/htmlToPdf', catchAsync(this.getPdfFromHtml));
    this.router.get('/:categoria/:id/:nombre', catchAsync(this.getImage));
  }

  async getPdfFromHtml(req, res) {
    // validations
    await validate(req, res, [check('html').notEmpty()]);

    await fileService.getPdfFromHtml(req.body.html, (buffer) => {
      res.set('Content-Type', 'application/pdf');
      res.set('Content-Disposition', 'attachment; filename=form.pdf');
      res.write(buffer, 'binary');
      return res.end(null, 'binary');
    });
  }

  async getImage(req, res) {
    const urlPath = `${req.params.categoria}/${req.params.id}/${req.params.nombre}`;
    await fileService.getImage(urlPath, (result) => {
      res.send(result);
    });
  }
}
