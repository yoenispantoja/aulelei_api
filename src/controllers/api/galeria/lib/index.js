/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:53
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:30:07
 * @ Description: Servicios de la entidad Galeria
 */

/* eslint-disable no-return-await */
import { Item } from '../../../../db/models/galeria';
import db from '../../../../db/entities';
import { BaseService } from '../../../base/BaseService';
import { BadRequestError, InvalidId } from '../../../../util/error';
import { saveFile } from '../../../../util/file-upload';

const path = require('path');

export class GaleriaService extends BaseService {
  //Traer todos los galerias
  async getAll() {
    const galerias = await db.Galeria.findAll({
      include: [
        {
          model: db.ImagenesGaleria,
          as: 'imagenes',
        },
        {
          model: db.User,
          as: 'publicadaPor',
        },
        {
          model: db.CategoriaGaleria,
          as: 'categoria',
        },
        {
          model: db.EstadoPublicacion,
          as: 'estado',
        },
      ],
    });
    return galerias.map((obj) => new Item(obj.toJSON()));
  }

  async getCategorias() {
    const categorias = await db.CategoriaGaleria.findAll();
    return categorias.map((obj) => new Item(obj.toJSON()));
  }

  async getEstados() {
    const estados = await db.EstadoPublicacion.findAll();
    return estados.map((obj) => new Item(obj.toJSON()));
  }

  //Traer un galeria especifico
  async getById(id) {
    const galeria = await db.Galeria.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.ImagenesGaleria,
          as: 'imagenes',
        },
        {
          model: db.User,
          as: 'publicadaPor',
        },
        {
          model: db.CategoriaGaleria,
          as: 'categoria',
        },
        {
          model: db.EstadoPublicacion,
          as: 'estado',
        },
      ],
    });

    return galeria && new Item(galeria.toJSON());
  }

  //Traer un galeria por un idUsuario específico
  async getByUserId(userId, transaction = undefined) {
    const galeria = await db.Galeria.findOne({
      where: {
        userId,
      },
      transaction,
    });

    return galeria && this.getById(galeria.id);
  }

  async add(galeriaData, imagenes) {
    const { nombre, descripcion, publicadaPor, categoria, estado } = galeriaData;

    //Trabajando el nombre de la imagen portada
    const archivo = imagenes[0].originalname;
    const nombreArchivoCortado = archivo.split('.');
    const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
    const nombreArchivo = `index-${new Date().getMilliseconds()}.${extension}`;

    const galeria = await db.Galeria.create({
      nombre,
      imagenPortada: nombreArchivo,
      descripcion,
      usuarioId: publicadaPor,
      categoriaId: categoria,
      estadoId: estado,
    });

    //Ahora guardo la imagenPortada físicamente
    const pathImg = path.resolve(__dirname, `../../../../../public/galerias/${galeria.id}`);

    //Utilizando el utilitario file-upload para guardar la imagen de portada
    saveFile(pathImg, imagenes[0], nombreArchivo);

    //Ahora guardo el resto y las asocio en base de datos
    for (let index = 1; index < imagenes.length; index++) {
      //genero un nombre aleatorio pero uniformado en cantidad de letras
      const randomText = Math.random()
        .toString(36)
        .substring(7);
      const nombreImagen = `gal-${galeria.id}-${randomText}-${new Date().getMilliseconds()}.${extension}`;
      saveFile(pathImg, imagenes[index], nombreImagen);
      //Salvando en la BD
      db.ImagenesGaleria.create({
        nombreImagen: nombreImagen,
        galeriaId: galeria.id,
      });
    }
    return this.getById(galeria.id);
  }

  //Eliminar
  async update(id, galeriaData, imagenes) {
    const { nombre, imagenPortada, descripcion, publicadaPor, categoria, estado } = galeriaData;

    const pathImg = path.resolve(__dirname, `../../../../../public/galerias/${id}`);

    //Si es que viene imagen para actualizar
    if (imagenPortada.length > 0) {
      //Trabajando el nombre de la imagen
      const archivo = imagenes[0].originalname;
      const nombreArchivoCortado = archivo.split('.');
      const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
      const nombreArchivo = `index-${new Date().getMilliseconds()}.${extension}`;

      await db.Galeria.update(
        {
          nombre,
          imagenPortada: nombreArchivo,
          descripcion,
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

      //Utilizando el utilitario file-upload
      saveFile(pathImg, imagenes[0], nombreArchivo);

      //Ahora guardo el resto y las asocio en base de datos
      for (let index = 1; index < imagenes.length; index++) {
        //genero un nombre aleatorio pero uniformado en cantidad de letras
        const randomText = Math.random()
          .toString(36)
          .substring(7);
        const nombreArchivoCortado = imagenes[index].originalname.split('.');
        const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
        const nombreImagen = `gal-${id}-${randomText}-${new Date().getMilliseconds()}.${extension}`;
        saveFile(pathImg, imagenes[index], nombreImagen);
        //Salvando en la BD
        db.ImagenesGaleria.create({
          nombreImagen: nombreImagen,
          galeriaId: id,
        });
      }
    } //De lo contrario, solo cambio sus datos y subo las imágenes nuevas
    else {
      await db.Galeria.update(
        {
          nombre,
          descripcion,
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
      //Ahora guardo el resto y las asocio en base de datos
      for (let index = 0; index < imagenes.length; index++) {
        //genero un nombre aleatorio pero uniformado en cantidad de letras
        const randomText = Math.random()
          .toString(36)
          .substring(7);
        const nombreArchivoCortado = imagenes[index].originalname.split('.');
        const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
        const nombreImagen = `gal-${id}-${randomText}-${new Date().getMilliseconds()}.${extension}`;
        saveFile(pathImg, imagenes[index], nombreImagen);
        //Salvando en la BD
        db.ImagenesGaleria.create({
          nombreImagen: nombreImagen,
          galeriaId: id,
        });
      }
    }

    return this.getById(id);
  }

  //Eliminar
  async removeImagen(id) {
    return await db.ImagenesGaleria.destroy({
      where: {
        id,
      },
    });
  }

  //Eliminar
  async remove(id) {
    return await db.Galeria.destroy({
      where: {
        id,
      },
    });
  }
}
