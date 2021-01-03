const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

export default class MStorage {
	constructor () {
		this.mainPath = `${process.env.TEMP_FOLDER}/`; //Esta es una carpeta temporal para que sea usada por multer
		const that = this;
		this.storage = multer.diskStorage({
			destination (_, __, cb) {
				const main = `${process.env.TEMP_FOLDER}/`;
				that.mkdirDirIfNotExists(main); //En caso de que no exista la crea
				cb(null, main);
			},
			filename (_, file, cb) {
				cb(null, file.originalname);
			}
		});

		const {storage} = this;
		this.upload = multer({ storage });
	}

	mkdirDirIfNotExists (path) {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path,{recursive:true});
		}
	}
}
