const express = require("express");

const router = express.Router();
const { upload } = require("../../middlewares/multer.config");
const { validateFile } = require("../../Utils/validateFiles");
const { createOutputFile } = require("../../Utils/createOutputFile");
const { parseXLSX } = require("../../Utils/xlsx/parseXSLS");
const { createEntregable1 } = require("../../Utils/Entregables/createEntregable1");
const { getRandomNumber } = require("../../Utils/getRandomNumber");
const { images } = require("../../Utils/Images/images");


// POST file/upload
router.post("/upload", upload.array("file"), async (request, response) => {
	try {
		const { files } = request;
		const { region } = request.body;

		validateFile(files);

		const promises = files.map(async (file) => {

			const jsonData = await parseXLSX(file);

			Promise.all(jsonData.map(async (json) => {
				const data = {
					Nombre: json.Nombre,
					imagen: images[getRandomNumber(40)],
					region: region
				}

				createEntregable1(data)

			}))


		})

		await Promise.all(promises);

		return response.json({Status: "Success", message: "Archivo procesado correctamente"});
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
});