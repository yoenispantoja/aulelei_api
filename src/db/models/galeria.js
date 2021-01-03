import { BaseModel } from './BaseModel';
import { Item as User } from './user';
import { Item as CategoriaGaleria } from './categoria-galeria';
import { Item as EstadoPublicacion } from './estado-publicacion';

//Clase para las publicaciones
export class Item extends BaseModel {
    constructor({ id, nombre, imagenPortada, descripcion, imagenes, publicadaPor, categoria, estado }) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.imagenPortada = imagenPortada;
        this.descripcion = descripcion;
        if (imagenes) this.imagenes = imagenes;
        if (publicadaPor) this.publicadaPor = new User(publicadaPor);
        if (categoria) this.categoria = new CategoriaGaleria(categoria);
        if (estado) this.estado = new EstadoPublicacion(estado);

    }
}