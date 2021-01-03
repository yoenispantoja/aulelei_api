import { BaseModel } from './BaseModel';
import { Item as CategoriaServicio } from './categoria-servicio';

//Clase para los comentarios
export class Item extends BaseModel {
  constructor({ id, nombre, email, comentario, estado, publicacion }) {
    super();
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.comentario = comentario;
    this.estado = estado;
    this.publicacion = publicacion;
  }
}
