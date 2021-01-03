import { BaseModel } from './BaseModel';
import { Item as Galeria } from './galeria';

//Clase para las publicaciones
export class Item extends BaseModel {
    constructor({ id, nombreImagen, galeria }) {
        super();
        this.id = id;
        this.nombreImagen = nombreImagen;
        if (galeria) this.galeria = new Galeria(galeria);
    }
}