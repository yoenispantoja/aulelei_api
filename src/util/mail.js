import { error } from './logger';

/* eslint-disable global-require */
export const sendEmail = async(email, subject, html) => {
    const send = require('gmail-send')({
        user: process.env.EMAIL_ALERTS,
        pass: process.env.EMAIL_APP_PASSWORD,		
        to: email,
        subject: `[Salón DondeDorian] ${subject}`,
        html
    });

    await send({}, (err, res) => {
        if (!err) { return true; }
        error(err, res);
        return null;
    });
};

export const sendWelcomeEmail = async(email, role) => {
    const subject = `Bienvenido(a) ${role}`;
    const html = `<body>
					<h1> Has sido registrado en nuestra aplicación </h1>
					<p> Inicia sesión y entérate de nuestros servicios </p>
					<a href="https://dondedorian.net/"> https://dondedorian.net</a>
					<br>
				`;
    sendEmail(email, subject, html);
};

export const sendWelcomeAgainEmail = async(email, role) => {
    const subject = `Bienvenido de nuevo, ahora tu rol es de ${role}`;
    const html = `<body>
					<h1> Tu usuario ha sido habilitado como ${role} </h1>
					<p> Login and discover all you can do in Marathon kids </p>
					<p> Inicia sesión y entérate de nuestros servicios </p>
                    <a href="https://dondedorian.net/"> https://dondedorian.net</a>
					<br>
                `;


    sendEmail(email, subject, html);
};

export const sendReservaEmail = async (datosReserva) => {
  const { referencia, nombreCliente, email, fecha, hora, estilista, servicio } = datosReserva;
  const subject = `RESERVA AGENDADA`;
    const html = `<body style="border:2px solid #FEA151; border-radius:8px; padding:20px; font-family:Tahoma; ">
                    <strong style="font-size:14px"> Hola ${nombreCliente},</strong>
					<h1 style="color:#FEA151"> Tu reserva en nuestro salón ha sido agendada </h1>
                    <p> <ul style="border:1px solid #DDD; padding:15px; display:inline-block">
					<li><strong>Referencia: </strong>${referencia} </li>
					<li><strong>Fecha: </strong>${fecha} </li>
                    <li> <strong>Hora: </strong>${hora} </li>
                    <li> <strong>Fecha: </strong>${fecha} </li>
                     <li> <strong>Servicio: </strong>${servicio} </li>
                    <li> <strong>Estilista: </strong>${estilista} </li></ul></p>
                    <br><br>
                    <p>Gracias por visitarnos!!!</p>
                    <a href="https://dondedorian.net/"> https://dondedorian.net</a>
                    <p>
                    <img src="http://dondedorian.net/wp-content/uploads/2018/07/logo1.png" style="background-color:#000; padding:6px">
                    </p>
					<br>
                `;
  sendEmail(email, subject, html);
};

