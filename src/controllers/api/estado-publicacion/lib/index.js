/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:53
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:31:01
 * @ Description: Servicios de la entidad EstadoPublicacion
 */

/* eslint-disable no-return-await */
import { Item } from '../../../../db/models/estado-publicacion';
import db from '../../../../db/entities';
import { BaseService } from '../../../base/BaseService';
import { BadRequestError, InvalidId } from '../../../../util/error';

export class EstadoPublicacionService extends BaseService {
  //Traer todos los estadopublicacions
  async getAll() {
    const estadosPublicaciones = await db.EstadoPublicacion.findAll({});
    return estadosPublicaciones.map((obj) => new Item(obj.toJSON()));
  }

  //Traer un estadopublicacion especifico
  async getById(id) {
    const estadoPublicacion = await db.EstadoPublicacion.findOne({
      where: {
        id,
      },
    });

    return estadoPublicacion && new Item(estadoPublicacion.toJSON());
  }

  //Eliminar
  async remove(id) {
    const resEstadoPublicacion = await db.EstadoPublicacion.findOne({
      where: {
        id,
      },
    });
    if (!resEstadoPublicacion) throw new InvalidId(id, 'EstadoPublicacion');

    return await db.EstadoPublicacion.update(
      {
        active: false,
      },
      {
        where: {
          id,
        },
      }
    );
  }
}
