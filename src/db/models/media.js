import { BaseModel } from './BaseModel';
import { Item as User } from './user';

//Clase para las publicaciones
export class Item extends BaseModel {
    constructor({ id, nombre, tamanno, mime_type, publicadaPor }) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.tamanno = tamanno;
        this.mime_type = mime_type;
        if (publicadaPor) this.publicadaPor = new User(publicadaPor);
    }
}