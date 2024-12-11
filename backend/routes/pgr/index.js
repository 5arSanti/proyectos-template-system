const express = require("express");
const path = require("path");

const router = express.Router();


const { upload } = require("../../middlewares/multer.config");


const { validateFile } = require("../../Utils/validateFiles");
const { parseXLSX } = require("../../Utils/xlsx/parseXSLS");
const { createEntregable1 } = require("../../Utils/Entregables/createEntregable1");
const { createEntregable2 } = require("../../Utils/Entregables/createEntregable2");
const { createEntregable4 } = require("../../Utils/Entregables/createEntregable4");
const { deleteFolder } = require("../../Utils/Folders/deleteFolder");
const { makeFolder } = require("../../Utils/Folders/makeFolder");
const { getEntregableData } = require("../../Utils/Entregables/getEntregableData");


// POST file/upload
router.post("/upload", upload.array("file"), async (request, response) => {
	try {
		const { files } = request;
		const { region } = request.body;

		validateFile(files);

		for (const file of files) {
            const jsonData = await parseXLSX(file);

            for (const json of jsonData) {

				const data = getEntregableData(json, region)

				await createEntregable1(data)
				await createEntregable2(data)
				await createEntregable4(data)
			}
		}


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