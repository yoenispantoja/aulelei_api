/**
 * @ Author: Yoenis
 * @ Create Time: 2020-03-30 16:15:09
 * @ Modified by: Your name
 * @ Modified time: 2020-03-30 17:40:49
 * @ Description: Este archivo se encarga de cargar dinámicamente los archivos de esta carpeta y asumirlos como las entidades del proyecto
 */

import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize from 'sequelize';

const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';

//ahora leo la configuración definida en el .env
const config = require(`${__dirname}/../../config/db.js`)[env];
const db = {}; //Inicio vacío

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//cargo archivo por archivo (solo los .js)
readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = sequelize.import(join(__dirname, file));
        db[model.name] = model; //los poniendo en el arreglo bd
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;