/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:53
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:29:49
 * @ Description: Servicios de la entidad Media
 */

/* eslint-disable no-return-await */
import { Item } from '../../../../db/models/media';
import db from '../../../../db/entities';
import { BaseService } from '../../../base/BaseService';
import { saveFile } from '../../../../util/file-upload';

const path = require('path');

export class MediaService extends BaseService {
  //Traer todos los medias
  async getAll() {
    const medias = await db.Media.findAll({
      include: {
        model: db.User,
        as: 'publicadaPor',
      },
    });
    return medias.map((obj) => new Item(obj.toJSON()));
  }

  //Traer un media especifico
  async getById(id) {
    const media = await db.Media.findOne({
      where: {
        id,
      },
      include: {
        model: db.User,
        as: 'publicadaPor',
      },
    });

    return media && new Item(media.toJSON());
  }

  //Traer un media por un idUsuario específico
  async getByUserId(userId, transaction = undefined) {
    const media = await db.Media.findOne({
      where: {
        userId,
      },
      transaction,
    });

    return media && this.getById(media.id);
  }

  async add(imagenData) {
    //Trabajando el nombre de la imagen
    const archivo = imagenData.originalname;
    const nombreArchivoCortado = archivo.split('.');
    const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
    const randomText = Math.random()
      .toString(36)
      .substring(7);
    const nombreArchivo = `media-${randomText}-${new Date().getMilliseconds()}.${extension}`;

    const media = await db.Media.create({
      nombre: nombreArchivo,
      tamanno: imagenData.size,
      mime_type: extension,
      usuarioId: 1,
    });

    //Ahora guardo la imagenPortada físicamente
    const pathImg = path.resolve(__dirname, `../../../../../public/medias`);

    //Utilizando el utilitario file-upload
    saveFile(pathImg, imagenData, nombreArchivo);
    return this.getById(media.id);
  }

  //Eliminar
  async remove(id) {
    return await db.Media.destroy({
      where: {
        id,
      },
    });
  }
}
