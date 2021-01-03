import { BaseModel } from './BaseModel';

//Clase para las publicaciones
export class Item extends BaseModel {
    constructor({ id, nombre, email, password, img, rol, google, active }) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.img = img;	
        this.rol = rol;
        this.google = google;
        this.active = active;
    }
}