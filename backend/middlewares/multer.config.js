const multer = require('multer')
const mimeTypes = require("mime-types")

//Multer config
let splitValue = "_$$_";

let uploadStorage = multer.diskStorage({
    destination: (request, file, callback) => {

        callback(null, `./uploads`);
    },
    filename: (request, file, callback) => {

		const nameArray = [file.originalname];
		const nameFile = nameArray.join(splitValue);


		let formatName =`${nameFile}`;

		callback(null, formatName);
    }
});


let upload = multer({
	storage: uploadStorage,
});

module.exports = { upload, process, splitValue };