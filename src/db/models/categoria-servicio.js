import { BaseModel } from './BaseModel';

//Clase para las categorias
export class Item extends BaseModel {
  constructor({ id, nombre, descripcion, servicios }) {
    super();
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;	
	this.servicios= servicios;
  }
}
