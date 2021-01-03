const fs = require('fs');
require('dotenv').config();

export const saveFile = async(pathImg, archivo, nombreArchivo) => {
    if (!fs.existsSync(pathImg)) {
        fs.mkdirSync(pathImg, { recursive: true });
    }

    //Trabajando con el nombre del archivo
    const nombreOriginal = archivo.originalname;
    //Moviéndolo para el destino final

    await fs.copyFile(`${process.env.TEMP_FOLDER}/${nombreOriginal}`, `${pathImg}/${nombreArchivo}`, (err) => {
        if (err) throw err;
        console.log(`El archivo se ha subido correctamente a ${pathImg}`);
    });
};

