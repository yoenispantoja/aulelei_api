import { BaseModel } from './BaseModel';

//Clase para las reservas
export class Item extends BaseModel {
  constructor({ id, codigo, fecha, hora, telefono, estado, servicio, trabajador, usuario }) {
    super();
    this.id = id;
    this.codigo = codigo;
    this.fecha = fecha;
    this.hora = hora;
	  this.telefono= telefono;
    this.estado = estado;
    this.servicio = servicio;
    this.trabajador = trabajador;
    this.usuario = usuario;
  }
}
