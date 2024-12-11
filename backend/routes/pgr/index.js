const express = require("express");
const path = require("path");

const router = express.Router();


const { upload } = require("../../middlewares/multer.config");


const { validateFile } = require("../../Utils/validateFiles");
const { parseXLSX } = require("../../Utils/xlsx/parseXSLS");
const { createEntregable1 } = require("../../Utils/Entregables/createEntregable1");
const { getRandomNumber } = require("../../Utils/getRandomNumber");
const { images } = require("../../Utils/EntregablesData/images");
const { descriptions } = require("../../Utils/EntregablesData/descriptions");
const { pasatiempos } = require("../../Utils/EntregablesData/pasatiempos");
const { tareas } = require("../../Utils/EntregablesData/tareas");
const { createEntregable2 } = require("../../Utils/Entregables/createEntregable2");
const { createEntregable4 } = require("../../Utils/Entregables/createEntregable4");
const { deleteFolder } = require("../../Utils/Folders/deleteFolder");
const { makeFolder } = require("../../Utils/Folders/makeFolder");


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
					styles: getRandomNumber(25),
					region: region,
					imagen: images[getRandomNumber(images.length)],
					descripcion: descriptions[getRandomNumber(descriptions.length)],
					pasatiempos: [
						pasatiempos[getRandomNumber(pasatiempos.length)],
						pasatiempos[getRandomNumber(pasatiempos.length)],
						pasatiempos[getRandomNumber(pasatiempos.length)],
						pasatiempos[getRandomNumber(pasatiempos.length)],
						pasatiempos[getRandomNumber(pasatiempos.length)],
					],
					tareas: [
						tareas[getRandomNumber(tareas.length)],
						tareas[getRandomNumber(tareas.length)],
						tareas[getRandomNumber(tareas.length)],
						tareas[getRandomNumber(tareas.length)],
					]
				}

				await createEntregable1(data)
				await createEntregable2(data)
				await createEntregable4(data)

			}))


		})

		await Promise.all(promises);

		return response.json({Status: "Success", message: "Archivo procesado correctamente"});
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
});


router.post("/delete-files", async (request, response) => {
	try {
		await deleteFolder(path.resolve(__dirname, "../../entregables/lotes/Entregable 1"));
		await makeFolder(path.resolve(__dirname, "../../entregables/lotes/Entregable 1"));

		await deleteFolder(path.resolve(__dirname, "../../entregables/lotes/Entregable 2"));
		await makeFolder(path.resolve(__dirname, "../../entregables/lotes/Entregable 2"));

		await deleteFolder(path.resolve(__dirname, "../../entregables/lotes/Entregable 4"));
		await makeFolder(path.resolve(__dirname, "../../entregables/lotes/Entregable 4"));

		return response.json({Status: "Success", message: "Output vaciado correctamente"});
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
})


module.exports = router;