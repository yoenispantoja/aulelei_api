/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-30 16:15:16
 * @ Modified by: Your name
 * @ Modified time: 2020-04-21 18:56:57
 * @ Description: Seeder para la primera carga de datos
 */

import db from '../entities';
import { error } from '../../util/logger';

const dropTables = async () => {
  await db.User.drop({
    cascade: true,
  });
};

//Creando roles
const createRoles = async () => {
  await db.Rol.bulkCreate([
    {
      nombre: 'Administrador',
      descripcion: 'Control y acceso total',
    },
    {
      nombre: 'Gerente',
      descripcion: 'Jefe del negocio',
    },
    {
      nombre: 'AdministradorWeb',
      descripcion: 'Administración del sitio Web',
    },
    {
      nombre: 'Cajero',
      descripcion: 'Cajero',
    },
    {
      nombre: 'Cliente',
      descripcion: 'Solo lectura',
    },
  ]);
};

//Creando usuarios
const createUser = async () => {
  await db.User.bulkCreate([
    {
      nombre: 'Yoenis Pantoja',
      email: 'yoenis.pantoja@gmail.com',
      password: '$2y$10$7XPSY073eyqluybRgWO4z.xj3dGiaGI0MEXVPSUbTLz3f5c5pPODG',
      img:
        'https://lh3.googleusercontent.com/-WvJfW7S-oSM/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJN5bFQy7fp8BaQMXPzW2AvVIzcU2A/s128-c/photo.jpg',
      rolId: 1,
      google: true,
    },
  ]);
};



//Creando estados de publicacion
const createEstadosPublicacion = async () => {
  await db.EstadoPublicacion.bulkCreate([
    {
      nombre: 'Borrador',
      descripcion: 'La publicación se encuentra en proceso de elaboración',
    },
    {
      nombre: 'Pendiente',
      descripcion: 'La publicación se encuentra pendiente para ser publicada en una fecha próxima',
    },
    {
      nombre: 'Publicada',
      descripcion: 'La publicación se encuentra publicada',
    },
  ]);
};

//Creando categorias de publicacion
const createCategoriasPublicacion = async () => {
  await db.CategoriaPublicacion.bulkCreate([
    {
      nombre: 'Portada',
      descripcion: 'Publicaciones que estarán en la portada del sitio',
    },
    {
      nombre: 'Noticias',
      descripcion: 'Publicaciones de noticias relacionadas con el negocio',
    },
  ]);
};

//Creando categorias de galeria
const createCategoriasGaleria = async () => {
  await db.CategoriaGaleria.bulkCreate([
    {
      nombre: 'Colecciones del creador',
      descripcion: 'Galerias de colecciones del creador',
    },
    {
      nombre: 'Diseño para artistas',
      descripcion: 'Galerias de personalización de trabajos para artistas',
    },
    {
      nombre: 'Kids',
      descripcion: 'Galerias de trabajos con niños',
    },
    {
      nombre: 'Ladies first',
      descripcion: 'Galerias de trabajos para mujeres',
    },
    {
      nombre: 'Paleta de colores',
      descripcion: 'Galerias de trabajos con colores varios',
    },
  ]);
};

//Creando eventos
const createEventos = async () => {
  await db.Evento.bulkCreate([
    {
      nombre: 'Concierto de GDZ',
      descripcion: 'El primer concierto de Gente de Zona en Cuba',
      foto: 'evento.png',
      lugar: 'Malecón',
      fechaInicio: new Date(),
      fechaFin: null,
      google: true,
      usuarioId: 1,
    },
  ]);
};
//Creando galerias
const createGaleria = async () => {
  await db.Galeria.bulkCreate([
    {
      nombre: 'Galería Jacob Forever',
      imagenPortada: 'jacob.png',
      descripcion: 'Galería de fotos del artista Jacob Forever',
      usuarioId: 1,
      categoriaId: 1,
      estadoId: 1,
    },
    {
      nombre: 'Galería Amelita Linda',
      imagenPortada: 'amelia.png',
      descripcion: 'Galería de fotos de Amelia',
      usuarioId: 1,
      categoriaId: 3,
      estadoId: 1,
    },
  ]);
};

//Creando publicaciones
const createPublicacion = async () => {
  await db.Publicacion.bulkCreate([
    {
      titulo: 'Inaugurada la aplicación de Dorian',
      imagenDestacada: 'jacob.png',
      fecha: new Date(),
      body: 'Aqui el body',
      meta_descripcion: 'meta descripcion',
      palabras_clave: 'palabras clave',
      usuarioId: 1,
      categoriaId: 1,
      estadoId: 1,
    },
    {
      titulo: 'Rebaja de precios en el negocio',
      imagenDestacada: 'amelia.png',
      fecha: new Date(),
      body: 'Aqui el body',
      meta_descripcion: 'meta descripcion',
      palabras_clave: 'palabras clave',
      usuarioId: 1,
      categoriaId: 2,
      estadoId: 1,
    },
  ]);
};

//Creando imagenes de la galeria
const createImagenesGaleria = async () => {
  await db.ImagenesGaleria.bulkCreate([
    {
      nombreImagen: 'jacob.png',
      galeriaId: 1,
    },
    {
      nombreImagen: 'amelia.png',
      galeriaId: 1,
    },
    {
      nombreImagen: 'yuri.png',
      galeriaId: 1,
    },
    {
      nombreImagen: 'juan.png',
      galeriaId: 2,
    },
    {
      nombreImagen: 'paco.png',
      galeriaId: 2,
    },
  ]);
};

//Creando categorias de servicios
const createCategoriasServicios = async () => {
  await db.CategoriaServicio.bulkCreate([
    {
      nombre: 'Barbería',
      descripcion: 'Servicios integrales de barbería',
    },
    {
      nombre: 'Peluquería',
      descripcion: 'Servicios integrales de peluquería',
    },
    {
      nombre: 'Manicuire y Pedicure',
      descripcion: 'Servicios integrales de manicure y pedicure',
    },
    {
      nombre: 'Maquillaje',
      descripcion: 'Servicios integrales de maquillaje',
    },
    {
      nombre: 'Tratamientos faciales',
      descripcion: 'Servicios integrales de tratamientos faciales',
    },
    {
      nombre: 'Asistencia en audiovisuales',
      descripcion: 'Servicios de asistencia en audiovisuales',
    },
  ]);
};

//Creando servicios
const createServicios = async () => {
  await db.Servicio.bulkCreate([
    {
      nombre: 'Corte y peinado',
      descripcion: 'Corte de cabello normal',
      avatar: 'corte.png',
      precio: 25.0,
      categoriaId: 1,
    },
    {
      nombre: 'Agrisado',
      descripcion: 'Agrisado de cabello',
      avatar: 'agrisado.png',
      precio: 15.0,
      categoriaId: 1,
    },
    {
      nombre: 'Maquillaje extrafuerte',
      descripcion: 'Maquillaje extendido',
      avatar: 'maquillaje.png',
      precio: 55.0,
      categoriaId: 4,
    },
  ]);
};

//Creando categorias de servicios
const createCategoriasProductos = async () => {
  await db.CategoriaProducto.bulkCreate([
    {
      nombre: 'Productos para el cabello',
      descripcion: 'Productos para el cabello',
    },
    {
      nombre: 'Productos para uñas',
      descripcion: 'Productos para uña',
    },
    {
      nombre: 'Productos para maquillaje',
      descripcion: 'Servicios integrales de manicure y pedicure',
    },
  ]);
};

//Creando productos
const createProductos = async () => {
  await db.Producto.bulkCreate([
    {
      nombre: 'Gel extrafuerte',
      descripcion: 'Gel extrafuerte',
      avatar: 'gel.png',
      precio: 5.0,
      um: 'ml',
      categoriaId: 1,
    },
    {
      nombre: 'Pintura reparadora',
      descripcion: 'Pintura reparadora',
      avatar: 'pintura.png',
      precio: 15.0,
      um: 'ml',
      categoriaId: 2,
    },
    {
      nombre: 'Polvo Solux',
      descripcion: 'Polvo extendido',
      avatar: 'polvo.png',
      precio: 55.0,
      um: 'gr',
      categoriaId: 3,
    },
  ]);
};

const init = async () => {
  await createRoles();
  await createUser();
  await createEventos();
  await createEstadosPublicacion();
  await createCategoriasPublicacion();
  await createCategoriasGaleria();
  await createGaleria();
  await createImagenesGaleria();
  await createPublicacion();
  await createCategoriasServicios();
  await createServicios();
  await createCategoriasProductos();
  await createProductos();
};

export const seed = async (drop = false) => {
  try {
    if (drop) await dropTables();
    return init();
  } catch (err) {
    error(err);
    throw err;
  }
};

export const initDatabaseAndSeed = () => {
  return db.sequelize
    .sync({
      force: true,
    })
    .then(async () => {
      console.log('Running seeds...');
      await init();
      return Promise.resolve();
    });
};
