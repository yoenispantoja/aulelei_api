/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:53
 * @ Modified by: Your name
 * @ Modified time: 2020-05-31 18:46:38
 * @ Description: Servicios de la entidad Publicacion
 */

/* eslint-disable no-return-await */
import { Item } from '../../../../db/models/publicacion';
import db from '../../../../db/entities';
import { BaseService } from '../../../base/BaseService';
import { BadRequestError, InvalidId } from '../../../../util/error';
import { saveFile } from '../../../../util/file-upload';

const path = require('path');

export class PublicacionService extends BaseService {
  //Traer todos las publicaciones
  async getAll() {
    const publicaciones = await db.Publicacion.findAll({
      include: [
        {
          model: db.User,
          as: 'publicadaPor',
        },
        {
          model: db.CategoriaPublicacion,
          as: 'categoria',
        },
        {
          model: db.EstadoPublicacion,
          as: 'estado',
        },
        {
          model: db.Comentario,
          as: 'comentarios'		  
        },
      ],
    });
    return publicaciones.map((obj) => new Item(obj.toJSON()));
  }

  //Traer una publicacion especifica
  async getById(id) {
    const publicacion = await db.Publicacion.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.User,
          as: 'publicadaPor',
        },
        {
          model: db.CategoriaPublicacion,
          as: 'categoria',
        },
        {
          model: db.EstadoPublicacion,
          as: 'estado',
        },
		{
          model: db.Comentario,
          as: 'comentarios',
        },
      ],
    });

    return publicacion && new Item(publicacion.toJSON());
  }

  //Traer un publicacion por un idUsuario específico
  //Se pasa una transaction por si este método es utilizado en otro combinado y llegara a fallar
  async getByUserId(usuarioId, transaction = undefined) {
    const publicacion = await db.Publicacion.findOne({
      where: {
        usuarioId,
        active: true,
      },
      transaction,
    });
    return publicacion && this.getById(publicacion.id);
  }

  async add(publicacionData, imagenData) {
    const { titulo, fecha, body, meta_descripcion, palabras_clave, publicadaPor, categoria, estado } = publicacionData;

    //Trabajando el nombre de la imagen
    const archivo = imagenData.originalname;
    const nombreArchivoCortado = archivo.split('.');
    const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
    const nombreArchivo = `index-${new Date().getMilliseconds()}.${extension}`;

    const publicacion = await db.Publicacion.create({
      titulo,
      imagenDestacada: nombreArchivo,
      fecha,
      body,
      meta_descripcion,
      palabras_clave,
      usuarioId: publicadaPor,
      categoriaId: categoria,
      estadoId: estado,
    });

    //Ahora guardo la imagenPortada físicamente
    const pathImg = path.resolve(__dirname, `../../../../../public/publicaciones/${publicacion.id}`);

    //Utilizando el utilitario file-upload
    saveFile(pathImg, imagenData, nombreArchivo);
    return this.getById(publicacion.id);
  }

  //Subir imagenes de las publicaciones con Tiny

  async addImagenPost(imagenData) {
    //Trabajando el nombre de la imagen
    const archivo = imagenData.originalname;
    const nombreArchivoCortado = archivo.split('.');
    const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
    //una cadenita random por si acaso
    const randomText = Math.random()
      .toString(36)
      .substring(7);
    const nombreArchivo = `pub-${randomText}-${new Date().getMilliseconds()}.${extension}`;
    //Ahora guardo la imagenPortada físicamente
    const pathImg = path.resolve(__dirname, `../../../../../public/publicaciones/all`);

    //Utilizando el utilitario file-upload
    saveFile(pathImg, imagenData, nombreArchivo);
    return nombreArchivo;
  }

  //Editar
  async update(id, publicacionData, imagenData) {
    const { titulo, fecha, body, meta_descripcion, palabras_clave, publicadaPor, categoria, estado } = publicacionData;

    //Si es que viene imagen para actualizar
    if (imagenData != null) {
      //Trabajando el nombre de la imagen
      const archivo = imagenData.originalname;
      const nombreArchivoCortado = archivo.split('.');
      const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
      const nombreArchivo = `index-${new Date().getMilliseconds()}.${extension}`;

      await db.Publicacion.update(
        {
          titulo,
          imagenDestacada: nombreArchivo,
          fecha,
          body,
          meta_descripcion,
          palabras_clave,
          usuarioId: publicadaPor,
          categoriaId: categoria,
          estadoId: estado,
        },
        {
          where: {
            id,
          },
        }
      );

      //Ahora guardo la imagenPortada físicamente
      const pathImg = path.resolve(__dirname, `../../../../../public/publicaciones/${id}`);

      //Utilizando el utilitario file-upload
      saveFile(pathImg, imagenData, nombreArchivo);
    } else {
      await db.Publicacion.update(
        {
          titulo,
          fecha,
          body,
          meta_descripcion,
          palabras_clave,
          usuarioId: publicadaPor,
          categoriaId: categoria,
          estadoId: estado,
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

  //Eliminar publicacion
  async remove(id) {
    return await db.Publicacion.destroy({
      where: {
        id,
      },
    });
  }

  //Trabajo con los comentarios
  async insertarComentario(comentarioData) {
    const { nombre, email, comentario, publicacionId } = comentarioData;
    const comentarioInsertado = await db.Comentario.create(
      {
        nombre,
        email,
        comentario,
        estado: 0,
		publicacionId
      }
    );
    return comentarioInsertado;
  }

  async updateComentario(id, comentarioData) {
    const { nombre, email, comentario, estado, publicacionId } = comentarioData;
    const comentarioActualizado = await db.Comentario.update(
      {
        nombre,
        email,
        comentario,
        estado,
		publicacionId
      },
      {
        where: {
          id,
        },
      }
    );

    return comentarioActualizado;
  }

  //Eliminar comentario
  async removeComentario(id) {
    return await db.Comentario.destroy({
      where: {
        id,
      },
    });
  }
}
