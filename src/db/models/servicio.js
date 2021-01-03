import { BaseModel } from './BaseModel';
import { Item as CategoriaServicio } from './categoria-servicio';

//Clase para los servicios
export class Item extends BaseModel {
  constructor({ id, nombre, descripcion, precio, activo, avatar, categoria, trabajadores, servicios }) {
    super();
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.avatar = avatar;
    this.precio = precio;
    this.activo = activo;
    if (categoria) this.categoria = new CategoriaServicio(categoria);
    this.trabajadores = trabajadores;
    this.servicios = servicios;
  }
}
