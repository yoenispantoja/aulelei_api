import { BaseModel } from './BaseModel';
import { Item as Usuario } from './user';
import { Item as TurnoServicio } from './turno-servicio';

//Clase para los trabajadores
export class Item extends BaseModel {
  constructor({ id, nombre_completo, sexo, ci, direccion, telefono, usuario, turno, servicios }) {
    super();
    this.id = id;
    this.nombre_completo = nombre_completo;
    this.sexo = sexo;
    this.ci = ci;
    this.direccion = direccion;
    this.telefono = telefono;
    this.active = 1;
    if (usuario) this.usuario = new Usuario(usuario);
    if (turno) this.turno = new TurnoServicio(turno);
    this.servicios = servicios;

  }
}
