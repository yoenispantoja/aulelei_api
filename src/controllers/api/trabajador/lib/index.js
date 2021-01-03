/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:53
 * @ Modified by: Your name
 * @ Modified time: 2020-05-06 15:05:17
 * @ Description: Trabajadors de la entidad Trabajador
 */

/* eslint-disable no-return-await */
import { Item } from '../../../../db/models/trabajador';
import { Item as Turno } from '../../../../db/models/turno-servicio';
import db from '../../../../db/entities';
import { BaseService } from '../../../base/BaseService';
import { saveFile } from '../../../../util/file-upload';
const path = require('path');

export class TrabajadorService extends BaseService {
  //Traer todos los trabajadors
  async getAll() {
    const trabajadores = await db.Trabajador.findAll({
      include: [
        {
          model: db.User,
          as: 'usuario',
          include: {
            model: db.Rol,
            as: 'rol',
          },
        },
        {
          model: db.TurnoServicio,
          as: 'turno',
        },
        {
          model: db.Servicio,
          as: 'servicios',
        },
      ],
    });
    return trabajadores.map((obj) => new Item(obj.toJSON()));
  }

  //Traer un trabajador especifico
  async getById(id) {
    const trabajador = await db.Trabajador.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.User,
          as: 'usuario',
		   include: {
            model: db.Rol,
            as: 'rol',
          },
        },
        {
          model: db.TurnoServicio,
          as: 'turno',
        },
        {
          model: db.Servicio,
          as: 'servicios',
		  include: {
            model: db.CategoriaServicio,
            as: 'categoria',
          },
        },
      ],
    });

    return trabajador && new Item(trabajador.toJSON());
  }

  //Traer los turnos de servicio
  async getTurnosServicio() {
    const turnos = await db.TurnoServicio.findAll();
    return turnos.map((obj) => new Turno(obj.toJSON()));
  }

  //Adicionar trabajador

  async add(trabajadorData) {    
    const {
      nombre_completo,
      sexo,
      ci,
      direccion,
      telefono,
      usuarioId,
      rolId,
      turnoServicioId,
      lista_servicios,
	  active
    } = trabajadorData;

    const trabajador = await db.Trabajador.create({
      nombre_completo,
      sexo,
      ci,
      direccion,
      telefono,
      usuarioId,      
      turnoServicioId,
	  active
    });

    //Ahora le cambio el rol
    db.User.update(
      {
        rolId,
      },
      {
        where: {
          id: usuarioId,
        },
      }
    );
    //Ahora guardo en la lista de trabajadores_servicio
    lista_servicios.map((servicio) => {	
      db.TrabajadorServicio.create({
        trabajadorId: trabajador.id,
        servicioId: servicio,
      });
    });

    return this.getById(trabajador.id);
  }

  //Editar trabajador

  async update(id, trabajadorData) {
    const {
      nombre_completo,
      sexo,
      ci,
      direccion,
      telefono,
      usuarioId,
      rolId,
      turnoServicioId,
      lista_servicios,
	  active
    } = trabajadorData;
	
	console.log('Id:'+id);
	console.log(trabajadorData);

    const trabajador = await db.Trabajador.update(
	{
      nombre_completo,
      sexo,
      ci,
      direccion,
      telefono,
      usuarioId,      
      turnoServicioId,
	  active
    },
     {
        where: {
          id:id
        }
     }
	 );
	 
	 console.log(trabajador);

    //Ahora le actualizo el rol
    db.User.update(
      {
        rolId,
      },
      {
        where: {
          id: usuarioId,
        },
      }
    );
    
	//Elimino los servicios que tenía anteriormente
	db.TrabajadorServicio.destroy({
      where: {
        trabajadorId:id
      },
	  force: true
    });
	
	//Ahora guardo en la lista de trabajadores_servicio
    lista_servicios.map((servicio) => {	
      db.TrabajadorServicio.create({
        trabajadorId: id,
        servicioId: servicio,
      });
    });

    return this.getById(id);
  }

  //Eliminar
  async remove(id) {
    return await db.Trabajador.destroy({
      where: {
        id,
      },
    });
  }
}
