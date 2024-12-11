const express = require("express");

const router = express.Router();
const { upload } = require("../../middlewares/multer.config");
const { validateFile } = require("../../Utils/validateFiles");
const { createOutputFile } = require("../../Utils/createOutputFile");
const { parseXLSX } = require("../../Utils/xlsx/parseXSLS");
const { createEntregable1 } = require("../../Utils/Entregables/createEntregable1");
const { getRandomNumber } = require("../../Utils/getRandomNumber");
const { images } = require("../../Utils/EntregablesData/images");
const { descriptions } = require("../../Utils/EntregablesData/descriptions");
const { pasatiempos } = require("../../Utils/EntregablesData/pasatiempos");
const { tareas } = require("../../Utils/EntregablesData/tareas");


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
					region: region,
					imagen: images[getRandomNumber(40)],
					descripcion: descriptions[getRandomNumber(20)],
					pasatiempos: [
						pasatiempos[getRandomNumber(30)],
						pasatiempos[getRandomNumber(30)],
						pasatiempos[getRandomNumber(30)],
						pasatiempos[getRandomNumber(30)],
						pasatiempos[getRandomNumber(30)],
					],
					tareas: [
						tareas[getRandomNumber(30)],
						tareas[getRandomNumber(30)],
						tareas[getRandomNumber(30)],
						tareas[getRandomNumber(30)],
					]

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

module.exports = router;