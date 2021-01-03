import { BaseModel } from './BaseModel';
import { Item as User } from './user';

//Clase para las publicaciones
export class Item extends BaseModel {
    constructor({
        id,
        nombre,
        descripcion,
        foto,
        lugar,
        fechaInicio,
        fechaFin,
        publicadoPor
    }) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.foto = foto;
        this.lugar = lugar;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        if (publicadoPor) this.publicadoPor = new User(publicadoPor);

    }
}