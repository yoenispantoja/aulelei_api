import { BaseModel } from './BaseModel';

//Clase para las categorias de los productos
export class Item extends BaseModel {
  constructor({ id, nombre, descripcion, productos }) {
    super();
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
	this.productos= productos;
  }
}
