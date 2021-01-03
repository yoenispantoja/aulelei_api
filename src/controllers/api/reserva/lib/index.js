/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-03-31 11:20:53
 * @ Modified by: Your name
 * @ Modified time: 2020-05-16 19:21:05
 * @ Description: Servicios de la entidad Reserva
 */

/* eslint-disable no-return-await */
import { Item } from '../../../../db/models/reserva';
import db from '../../../../db/entities';
import { BaseService } from '../../../base/BaseService';
import { sendReservaEmail } from '../../../../util/mail';

export class ReservaService extends BaseService {
  //Traer todos los reservas
  async getAll() {
    const reservas = await db.Reserva.findAll({
      include: [
        {
          model: db.Servicio,
          as: 'servicio',
        },
        {
          model: db.Trabajador,
          as: 'trabajador',
        },
        {
          model: db.User,
          as: 'usuario',
        },
      ],
    });
    return reservas.map((obj) => new Item(obj.toJSON()));
  }

  //Traer un reserva especifico
  async getById(id) {
    const reserva = await db.Reserva.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.Servicio,
          as: 'servicio',
        },
        {
          model: db.Trabajador,
          as: 'trabajador',
        },
        {
          model: db.User,
          as: 'usuario',
        },
      ],
    });

    return reserva && new Item(reserva.toJSON());
  }

  //Traer todas las reservas de un estilista determinado
  async getReservaTrabajadorId(trabajadorId) {
    const reservas = await db.Reserva.findAll({
      where: {
        trabajadorId,
      },
      include: [
        {
          model: db.Servicio,
          as: 'servicio',
        },
        {
          model: db.User,
          as: 'usuario',
        },
      ],
    });
    return reservas;
  }

  //Adicionar reserva

  async add(reservaData) {
    const { telefono, fecha, hora, estado, servicio, trabajador, usuario } = reservaData;
    //generar un codigo
    const codigo=`RE${servicio}${Math.random().toString(36).substring(7).toUpperCase()}`
    const reserva = await db.Reserva.create({
      codigo,
      telefono,
      fecha,
      hora,
      estado: 0,
      servicioId: servicio,
      trabajadorId: trabajador,
      usuarioId: usuario
    });

    //Enviar correo al cliente
    const cliente = await db.User.findOne({ where: { id: usuario } });
    const estilista = await db.Trabajador.findOne({ where: { id: trabajador } });
    const servicioReservado = await db.Servicio.findOne({ where: { id: servicio } });
    const fechaReserva = new Date(fecha);
    const horaReserva = new Date(hora);

    const datosReserva = {
	  referencia: reserva.codigo,
      nombreCliente: cliente.nombre,
      email: cliente.email,
      servicio: servicioReservado.nombre,
      estilista: estilista.nombre_completo,
      fecha: `${fechaReserva.getDate()}/${fechaReserva.getMonth()}/${fechaReserva.getFullYear()}`,
      hora: `${horaReserva.getHours()}:${horaReserva.getMinutes()}0`
    }
    sendReservaEmail(datosReserva);
    return this.getById(reserva.id);
  }

  //Editar reserva

  async update(id, reservaData) {
    const { fecha, hora, estado, servicio, trabajador, usuario } = reservaData;

    const reserva = await db.Reserva.update(
      {
        fecha,
        hora,
        estado,
        servicioId: servicio,
        trabajadorId: trabajador,
        usuarioId: usuario,
      },
      {
        where: {
          id,
        },
      }
    );

    return this.getById(id);
  }

  //Eliminar
  async remove(id) {
    return await db.Reserva.destroy({
      where: {
        id,
      },
    });
  }
}
