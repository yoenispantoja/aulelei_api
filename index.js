/* eslint-disable no-console */
/* servidor express */
import express from 'express';
// body-parser: extrae toda la parte del cuerpo de una secuencia de solicitud entrante y la expone en req.body.
import { json, urlencoded } from 'body-parser';

// tema de permitir acceder al frontend desde dominios diferentes
import cors from 'cors';

// guarda los logs automáticamente
import morgan from 'morgan';

// asegurar los paths dinámicos
import * as path from 'path';

// para el trabajo con la bd llamo al archivo index.js de las entidades
import db from './src/db/entities'; //

// las Rutas
import { ApiRouter } from './src/controllers/api';
import { AuthRouter } from './src/controllers/auth';

// Seeder para repoblar la BD para pruebas
import { seed, initDatabaseAndSeed } from './src/db/seeders/seeder';

/* Make all variables from our .env file available in our process */
require('dotenv').config();

/* Init express */
const app = express();
const authRouter = new AuthRouter();
const apiRouter = new ApiRouter();

/* Engine */
app.set('view engine', 'ejs');

/* Carga los middlewares & configs */
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public'))); // disponer la carpeta pública

// Configurando los headers de las rutas (CORS)

app.all('/*', (req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization, Content-Length, X-Requested-With'
        );
        res.send(200);
    } else if (
        req.method === 'GET' ||
        req.method === 'POST' ||
        req.method === 'PUT' ||
        req.method === 'DELETE' ||
        req.method === 'PATCH'
    ) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization, Content-Length, X-Requested-With'
        );
        next();
    }
});

app.use(morgan('combined'));

app.get('/', (_, res) => res.send('Hola extraño... ahora mismo esto no funciona, pero estamos trabajando para arreglarlo.... :-p'));
app.use('/api/auth', authRouter.router); //Rutas para la autenticación
app.use('/api', apiRouter.router); //Demás rutas (exige que en las llamadas se pase un token como Authorization)

// Configurando el puerto de la aplicación
const port = process.env.PORT || 3000;
//const address = process.env.SERVER_ADDRESS || '127.0.0.1';

// función para echar a andar el servidor
function createServer() {
    app.listen(port, () => console.log(`Server running on port:${port}`));
}

function seederTemp() {
    db.Media.bulkCreate([{
            nombre: 'evento.png',
            tamanno: 255,
            mime_type: 'png',
            usuarioId: 1
        },
        {
            nombre: 'lilia.png',
            tamanno: 344,
            mime_type: 'png',
            usuarioId: 1
        },
        {
            nombre: 'cuba.jpg',
            tamanno: 723,
            mime_type: 'jpg',
            usuarioId: 1
        }
    ]);
}

/* Creado las tablas de la BD si la variable INIT_DB es true */
if (process.env.INIT_DB === 'true') {
    console.log('Initializing database ...');
    // Sincronizamos todos los modelos
    db.sequelize
        .sync({
            force: true
        })
        .then(async() => {
            console.log('Corriendo los seeds...(Poblando la base de datos con datos iniciales)');
            await initDatabaseAndSeed(); //Con el parámetro false evitamos borrar las tablas (porque ya existen)
        })
        .then(createServer);
} else {
    console.log('INIT_DB is false so migrations will not occur');
    //seederTemp();
    createServer();
}

export default app;