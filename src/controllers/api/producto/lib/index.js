/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:53
 * @ Modified by: Your name
 * @ Modified time: 2020-06-19 12:22:46
 * @ Description: Servicios de la entidad Producto
 */

/* eslint-disable no-return-await */
import { Item } from '../../../../db/models/producto';
import db from '../../../../db/entities';
import { BaseService } from '../../../base/BaseService';
import { saveFile } from '../../../../util/file-upload';
const path = require('path');

export class ProductoService extends BaseService {
  //Traer todos los productos
  async getAll() {
    const productos = await db.Producto.findAll({
      include: {
        model: db.CategoriaProducto,
        as: 'categoria',
      },
    });
    return productos.map((obj) => new Item(obj.toJSON()));
  }

  //Traer un producto especifico
  async getById(id) {
    const producto = await db.Producto.findOne({
      where: {
        id,
      },
      include: {
        model: db.CategoriaProducto,
        as: 'categoria',
      },
    });

    return producto && new Item(producto.toJSON());
  }

  //Traer un producto por una Categoria específico
  async getCategoriasProducto() {
    const categorias = await db.CategoriaProducto.findAll({
      include: {
        model: db.Producto,
        as: 'productos',
      },
    });
    return categorias;
  }

  //Traer un producto por código específico
  async getProductoPorCodigo(codigo, transaction = undefined) {
    const producto = await db.Producto.findOne({
      where: {
        codigo,
      },
      transaction,
    });

    return producto && this.getById(producto.id);
  }

  //Traer un producto por una Categoria específico
  async getByCategoriaId(categoriaId, transaction = undefined) {
    const producto = await db.Producto.findOne({
      where: {
        categoriaId,
      },
      transaction,
    });

    return producto && this.getById(producto.id);
  }

  //Adicionar producto

  async add(productoData, fotoProducto) {
    const { codigo, nombre, descripcion, categoria, precio, um, cantidad_stock } = productoData;
    //Trabajando el nombre de la imagen
    const archivo = fotoProducto.originalname;
    const nombreArchivoCortado = archivo.split('.');
    const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
    const randomText = Math.random()
      .toString(36)
      .substring(7);
    const nombreArchivo = `producto-${randomText}-${new Date().getMilliseconds()}.${extension}`;

    const producto = await db.Producto.create({
	  codigo,
      nombre,
      descripcion,
      avatar: nombreArchivo,
      precio,
      um,
      categoriaId: categoria,
      cantidad_stock
    });

    //Ahora guardo la avatar físicamente
    const pathImg = path.resolve(__dirname, `../../../../../public/productos/${producto.id}`);
    //Utilizando el utilitario file-upload
    saveFile(pathImg, fotoProducto, nombreArchivo);
    return this.getById(producto.id);
  }

  //Editar producto

  async update(id, productoData, fotoProducto) {
    const { codigo, nombre, descripcion, avatar, categoria, precio, um, cantidad_stock, disponible } = productoData;
    const pathImg = path.resolve(__dirname, `../../../../../public/productos/${id}`);
    //Si es que viene imagen para actualizar
    if (avatar.length > 0) {
      //Trabajando el nombre de la imagen
      const archivo = fotoProducto.originalname;
      const nombreArchivoCortado = archivo.split('.');
      const extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];
      const randomText = Math.random()
        .toString(36)
        .substring(7);
      const nombreArchivo = `producto-${randomText}-${new Date().getMilliseconds()}.${extension}`;
      await db.Producto.update(
        {
          codigo,
		  nombre,
          descripcion,
          avatar: nombreArchivo,
          precio,
          um,
          categoriaId: categoria,
          cantidad_stock,
          disponible
        },
        {
          where: {
            id,
          },
        }
      );

      //Utilizando el utilitario file-upload
      saveFile(pathImg, fotoProducto, nombreArchivo);
    } else {
      await db.Producto.update(
        {
          codigo,
          nombre,
          descripcion,
          precio,
          um,
          categoriaId: categoria,
          cantidad_stock,
          disponible,
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
    return await db.Producto.destroy({
      where: {
        id,
      },
    });
  }
}
