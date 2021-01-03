/**
 * @ Author: Yoenis Pantoja
 * @ Create Time: 2020-04-01 17:08:57
 * @ Modified by: Your name
 * @ Modified time: 2020-04-22 00:06:58
 * @ Description: Utilitaria para verificar token de autenticación mediantes redes sociales
 */
import { SocialAuthError } from '../util/error';

require('dotenv').config();

//Usando la librería para validación de Google Authentication

const { OAuth2Client } = require('google-auth-library');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const validarGoogleToken = async (token) => {

  const ticket = await client
    .verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    })
    .catch((e) => {
      throw new SocialAuthError('Error de acceso con las credenciales de Google');
    });

  return ticket;
};
