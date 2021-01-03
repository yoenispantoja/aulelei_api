import { BaseModel } from './BaseModel';

//Clase para las categorias de las galerias
export class Item extends BaseModel {
    constructor({ id, nombre, descripcion }) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}