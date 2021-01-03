import { BaseModel } from './BaseModel';

//Clase para las publicaciones
export class Item extends BaseModel {
    constructor({ id, nombre, descripcion }) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}