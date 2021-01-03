import { BaseModel } from './BaseModel';
import { Item as Trabajador } from './trabajador';
import { Item as Servicio } from './servicio';

//Clase para relacionar los trabajadores con sus servicios
export class Item extends BaseModel {
  constructor({ trabajadorId, servicioId }) {
    super();
    this.trabajadorId = trabajadorId;
    this.servicioId = servicioId;
  }
}
