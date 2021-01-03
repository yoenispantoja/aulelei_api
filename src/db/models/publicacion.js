import { BaseModel } from './BaseModel';
import { Item as User } from './user';
import { Item as CategoriaPublicacion } from './categoria-publicacion';
import { Item as EstadoPublicacion } from './estado-publicacion';

//Clase para las publicaciones
export class Item extends BaseModel {
    constructor({
        id,
        titulo,
        imagenDestacada,
        fecha,
        body,
        meta_descripcion,
        palabras_clave,
        publicadaPor,
        categoria,
        estado,
        comentarios
    }) {
        super();
        this.id = id;
        this.titulo = titulo;
        this.imagenDestacada = imagenDestacada;
        this.fecha = fecha;
        this.body = body;
        this.meta_descripcion = meta_descripcion;
        this.palabras_clave = palabras_clave;
        if (publicadaPor) this.publicadaPor = new User(publicadaPor);
        if (categoria) this.categoria = new CategoriaPublicacion(categoria);
        if (estado) this.estado = new EstadoPublicacion(estado);
        this.comentarios= comentarios;

    }
}