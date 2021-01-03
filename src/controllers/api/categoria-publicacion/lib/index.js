/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:53
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:31:19
 * @ Description: Servicios de la entidad CategoriaPublicacion
 */

/* eslint-disable no-return-await */
import { Item } from '../../../../db/models/categoria-publicacion';
import db from '../../../../db/entities';
import { BaseService } from '../../../base/BaseService';
import { BadRequestError, InvalidId } from '../../../../util/error';

export class CategoriaPublicacionService extends BaseService {
  //Traer todos los categoriapublicacions
  async getAll() {
    const categoriasPublicaciones = await db.CategoriaPublicacion.findAll({});
    return categoriasPublicaciones.map((obj) => new Item(obj.toJSON()));
  }

  //Traer un categoriapublicacion especifico
  async getById(id) {
    const categoriaPublicacion = await db.CategoriaPublicacion.findOne({
      where: {
        id,
      },
    });

    return categoriaPublicacion && new Item(categoriaPublicacion.toJSON());
  }

  //Eliminar
  async remove(id) {
    const resCategoriaPublicacion = await db.CategoriaPublicacion.findOne({
      where: {
        id,
      },
    });
    if (!resCategoriaPublicacion) throw new InvalidId(id, 'CategoriaPublicacion');

    return await db.CategoriaPublicacion.update(
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
