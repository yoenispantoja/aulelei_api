import HTMLToPDF from 'convert-html-to-pdf';

const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');

export class FileService {
  async getPdfFromHtml(html, { format, orientation }, callback) {
    const pdfOptions = {
      format: format ? 'A4' : '',
      orientation: orientation ? 'portrait' : '',
    };
    pdf.create(html, pdfOptions).toBuffer((err, buffer) => {
      if (err) {
        return null;
      }
      return callback(buffer);
    });
  }

  async getPdfFromHtmlV1(html) {
    const buffer = await new HTMLToPDF(html, {
      pdfOptions: {
        printBackground: true,
      },
    }).convert();
    return buffer;
  }

  async getImage(url, callback) {
    const pathImagen = await path.resolve(__dirname, `../../../../../uploads/${url}`);
    if (fs.existsSync(pathImagen)) {
      return callback(pathImagen);
    } else {
      let noImagePath = await path.resolve(__dirname, '../../../../../public/assets/original.jpg');
      return callback(noImagePath);
    }
  }
}
