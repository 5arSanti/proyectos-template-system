const express = require("express");
const path = require('path');
const archiver = require("archiver");

const router = express.Router();

const { upload } = require("../../middlewares/multer.config");

const { validateFile } = require("../../Utils/validateFiles");


const { validateObjectValues } = require('../../Utils/validateObjectValues');
const { createOutputFile } = require('../../Utils/createOutputFile');
const { parseXLSX } = require("../../Utils/xlsx/parseXSLS");


router.get("/output", async (request, response) => {
	try {
		const outputDir = path.resolve(__dirname, "../../project_files/output");

        const zipFileName = "output.zip";

        response.setHeader("Content-Type", "application/zip");
        response.setHeader("Content-Disposition", `attachment; filename=${zipFileName}`);


        const archive = archiver("zip", {
            zlib: { level: 9 },
        });

        archive.on("error", (err) => {
            throw err;
        });

        archive.pipe(response);

        archive.directory(outputDir, false);

        await archive.finalize();
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
})


// POST file/upload
router.post("/upload", upload.single("file"), async (request, response) => {
	try {
		const { file } = request;
		const { bootcamp } = request.body;

		validateFile(file);

		const name = file.filename.split(".")[0]

		const jsonData = await parseXLSX(file);

        await createOutputFile(jsonData, name, bootcamp);


		return response.json({Status: "Success", message: "Archivo procesado correctamente"});
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
});

router.post("/json", async (request, response) => {
	try {
		validateObjectValues(request.body);


		const { jsonValue } = request.body;

		const parsedJSON = JSON.parse(jsonValue);

        await createOutputFile(parsedJSON);

		return response.json({Status: "Success", message: "Archivo procesado correctamente"});
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
})


module.exports = router;
