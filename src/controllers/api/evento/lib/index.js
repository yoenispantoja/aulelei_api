/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:53
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:30:42
 * @ Description: Servicios de la entidad Evento
 */

/* eslint-disable no-return-await */
import { Item } from '../../../../db/models/evento';
import db from '../../../../db/entities';
import { BaseService } from '../../../base/BaseService';
import { BadRequestError, InvalidId } from '../../../../util/error';

import { saveFile } from '../../../../util/file-upload';

const path = require('path');

export class EventoService extends BaseService {
  //Traer todos los eventos
  async getAll() {
    const eventos = await db.Evento.findAll({
      include: {
        model: db.User,
        as: 'publicadoPor',
      },
    });
    return eventos.map((obj) => new Item(obj.toJSON()));
  }

  //Traer un evento especifico
  async getById(id) {
    const evento = await db.Evento.findOne({
      where: {
        id,
      },
      include: {
        model: db.User,
        as: 'publicadoPor',
      },
    });

    return evento && new Item(evento.toJSON());
  }

  //Traer un evento por un idUsuario específico
  async getByUserId(userId, transaction = undefined) {
    const evento = await db.Evento.findOne({
      where: {
        userId,
      },
      transaction,
    });

    return evento && this.getById(evento.id);
  }

  //Adicionar evento

  async add(eventoData, imagenData) {
    const { nombre, descripcion, fechaInicio, fechaFin, lugar, publicadoPor } = eventoData;

    //Trabajando el nombre de la imagen
    const archivo = imagenData.originalname;
    const nombreArchivoCortado = archivo.split('.');
    const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
    const randomText = Math.random()
      .toString(36)
      .substring(7);
    const nombreArchivo = `evento-${randomText}-${new Date().getMilliseconds()}.${extension}`;

    const evento = await db.Evento.create({
      nombre,
      descripcion,
      fechaInicio,
      fechaFin: fechaFin || null,
      lugar,
      foto: nombreArchivo,
      usuarioId: publicadoPor,
    });

    //Ahora guardo la imagenPortada físicamente
    const pathImg = path.resolve(__dirname, `../../../../../public/eventos/${evento.id}`);

    //Utilizando el utilitario file-upload
    saveFile(pathImg, imagenData, nombreArchivo);
    return this.getById(evento.id);
  }

  //Editar evento

  async update(id, eventoData, imagenData) {
    const { nombre, descripcion, fechaInicio, fechaFin, lugar, imagenPortada, publicadoPor } = eventoData;

    const pathImg = path.resolve(__dirname, `../../../../../public/eventos/${id}`);

    //Si es que viene imagen para actualizar
    if (imagenPortada.length > 0) {
      //Trabajando el nombre de la imagen
      const archivo = imagenData.originalname;
      const nombreArchivoCortado = archivo.split('.');
      const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
      const randomText = Math.random()
        .toString(36)
        .substring(7);
      const nombreArchivo = `index-${randomText}-${new Date().getMilliseconds()}.${extension}`;

      const evento = await db.Evento.update(
        {
          nombre,
          descripcion,
          fechaInicio,
          fechaFin: fechaFin || null,
          lugar,
          foto: nombreArchivo,
          usuarioId: publicadoPor,
        },
        {
          where: {
            id,
          },
        }
      );

      //Utilizando el utilitario file-upload
      saveFile(pathImg, imagenData, nombreArchivo);
    } else {
      const evento = await db.Evento.update(
        {
          nombre,
          descripcion,
          fechaInicio,
          fechaFin: fechaFin || null,
          lugar,
          usuarioId: publicadoPor,
        },
        {
          where: {
            id,
          },
        }
      );
    }
    return this.getById(id);
  }

  //Eliminar
  async remove(id) {
    return await db.Evento.destroy({
      where: {
        id,
      },
    });
  }
}
