/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:53
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 14:28:18
 * @ Description: Servicios de la entidad Servicio
 */

/* eslint-disable no-return-await */
import { Item } from '../../../../db/models/servicio';
import db from '../../../../db/entities';
import { BaseService } from '../../../base/BaseService';

import { saveFile } from '../../../../util/file-upload';

const path = require('path');

export class ServicioService extends BaseService {
  //Traer todos los servicios
  async getAll() {
    const servicios = await db.Servicio.findAll({
      include: [
        {
          model: db.CategoriaServicio,
          as: 'categoria',
        },
        {
          model: db.Trabajador,
          as: 'trabajadores',
        },
      ],
    });
    return servicios.map((obj) => new Item(obj.toJSON()));
  }
  
  //Traer el resumen general
  async getResumen() {
    let publicaciones = 0;
	let galerias=0;
	let eventos=0;
	let medias=0;
	let trabajadores=0;
	let servicios=0;
	let productos=0;
	let reservas=0;
	
	await db.Publicacion.count().then(c => {
	  publicaciones=c;
	})
	
	await db.Galeria.count().then(c => {
	  galerias=c;
	})
	
	await db.Evento.count().then(c => {
	  eventos=c;
	})
	
	await db.Media.count().then(c => {
	  medias=c;
	})
	
	await db.Trabajador.count().then(c => {
	  trabajadores=c;
	})
	
	await db.Servicio.count().then(c => {
	  servicios=c;
	})
	
	await db.Producto.count().then(c => {
	  productos=c;
	})
	
	await db.Reserva.count().then(c => {
	  reservas=c;
	})
	
	const cantidades={
		tPublicaciones: publicaciones,
		tGalerias: galerias,
		tEventos: eventos,
		tMedias: medias,
		tTrabajadores: trabajadores,
		tServicios: servicios,
		tProductos: productos,
		tReservas: reservas,
		
	}
    return cantidades;
  }

  //Traer un servicio especifico
  async getById(id) {
    const servicio = await db.Servicio.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.CategoriaServicio,
          as: 'categoria',
        },
        {
          model: db.Trabajador,
          as: 'trabajadores',
		  include: {
            model: db.User,
            as: 'usuario',
          }
        },
      ],
    });

    return servicio && new Item(servicio.toJSON());
  }

  //Traer todas las categorias de servicios
  async getCategoriasServicio() {
    const categorias = await db.CategoriaServicio.findAll({
      include: [
        {
          model: db.Servicio,
          as: 'servicios',
        },
      ],
    });
    return categorias;
  }

  //Traer un servicio por una categoria específica
  async getByCategoriaId(categoriaId, transaction = undefined) {
    const categoria = await db.CategoriaServicio.findOne({
      where: {
        id:categoriaId,
      },
	  include: [
        {
          model: db.Servicio,
          as: 'servicios',
        },
      ],
      transaction,
    });

    return categoria;
  }

  //Adicionar servicio

  async add(servicioData, fotoServicio) {
    const { nombre, descripcion, avatar, categoria, precio, activo } = servicioData;

    //Trabajando el nombre de la imagen
    const archivo = fotoServicio.originalname;
    const nombreArchivoCortado = archivo.split('.');
    const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
    const randomText = Math.random()
      .toString(36)
      .substring(7);
    const nombreArchivo = `servicio-${randomText}-${new Date().getMilliseconds()}.${extension}`;

    const servicio = await db.Servicio.create({
      nombre,
      descripcion,
      avatar: nombreArchivo,
      precio,
	  activo,
      categoriaId: categoria,
    });

    //Ahora guardo la avatar físicamente
    const pathImg = path.resolve(__dirname, `../../../../../public/servicios/${servicio.id}`);

    //Utilizando el utilitario file-upload
    saveFile(pathImg, fotoServicio, nombreArchivo);
    return this.getById(servicio.id);
  }

  //Editar servicio

  async update(id, servicioData, fotoServicio) {
    const { nombre, descripcion, avatar, categoria, precio, activo } = servicioData;

    const pathImg = path.resolve(__dirname, `../../../../../public/servicios/${id}`);

    //Si es que viene imagen para actualizar
    if (avatar.length > 0) {
      //Trabajando el nombre de la imagen
      const archivo = fotoServicio.originalname;
      const nombreArchivoCortado = archivo.split('.');
      const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
      const randomText = Math.random()
        .toString(36)
        .substring(7);
      const nombreArchivo = `servicio-${randomText}-${new Date().getMilliseconds()}.${extension}`;

      await db.Servicio.update(
        {
          nombre,
          descripcion,
          avatar: nombreArchivo,
          precio,
		  activo,
          categoriaId: categoria,
        },
        {
          where: {
            id,
          },
        }
      );

      //Utilizando el utilitario file-upload
      saveFile(pathImg, fotoServicio, nombreArchivo);
    } else {
      await db.Servicio.update(
        {
          nombre,
          descripcion,
          precio,
		  activo,
          categoriaId: categoria,
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
    return await db.Servicio.destroy({
      where: {
        id,
      },
    });
  }
}
