import { BaseModel } from './BaseModel';
import { Item as CategoriaProducto } from './categoria-producto';

//Clase para los productos
export class Item extends BaseModel {
  constructor({ id, codigo, nombre, descripcion, precio, avatar, categoria, um, cantidad_stock, disponible }) {
    super();
    this.id = id;
	this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.avatar = avatar;
    this.precio = precio;
    this.um = um;
    this.cantidad_stock = cantidad_stock;
    this.disponible = disponible;
    if (categoria) this.categoria = new CategoriaProducto(categoria);
  }
}
