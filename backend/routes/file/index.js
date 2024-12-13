const express = require("express");
const path = require('path');
const archiver = require("archiver");
const xlsx = require("xlsx");
const fs = require("fs");


const router = express.Router();

const { upload } = require("../../middlewares/multer.config");

const { validateFile } = require("../../Utils/validateFiles");


const { validateObjectValues } = require('../../Utils/validateObjectValues');
const { createOutputFile } = require('../../Utils/createOutputFile');
const { parseXLSX } = require("../../Utils/xlsx/parseXSLS");
const { resetFolder } = require("../../Utils/resetFolder");


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
router.post("/upload", upload.array("file"), async (request, response) => {
	try {
		const { files } = request;
		const { bootcamp } = request.body;

		validateFile(files);

		let errorLog = [];

		const promises = files.map(async file => {
			const name = file.filename.split(".")[0]

			const jsonData = await parseXLSX(file);

			await createOutputFile(jsonData, name, bootcamp, errorLog);
		})

		await Promise.all(promises);

		return response.json({Status: "Success", message: "Archivo procesado correctamente", errorLog: errorLog});
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
});

router.post("/delete-files", async (request, response) => {
	try {
		await resetFolder("output/Programacion")
		await resetFolder("output/Analisis de datos")
		await resetFolder("output/Inteligencia artificial")

		await resetFolder("output_pdf/Programacion")
		await resetFolder("output_pdf/Analisis de datos")
		await resetFolder("output_pdf/Inteligencia artificial")

		return response.json({Status: "Success", message: "Output vaciado correctamente"});
	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
})




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

router.post("/project", async (request, response) => {
    try {
        // Obtén el texto del cuerpo de la solicitud
        const text = request.body.project;
        if (!text) {
            return response.status(400).json({ Error: "No se proporcionó texto en la solicitud." });
        }

        const regex = /\{(.*?)\}\s*([\s\S]*?)(?=(\n\{|$))/g;
        let match;

        const data = {};

        while ((match = regex.exec(text)) !== null) {
            const section = match[1].trim(); // Título dentro de {}
            const content = match[2].trim(); // Texto asociado
            data[section] = content;
        }

        if (Object.keys(data).length === 0) {
            return response.status(400).json({ Error: "No se encontraron secciones válidas en el texto." });
        }

        const workbook = xlsx.utils.book_new();

        // Crear los datos para el Excel
        const worksheetData = [
            Object.keys(data),
            Object.values(data)
        ];
        const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);

        xlsx.utils.book_append_sheet(workbook, worksheet, "Proyecto");

        const filePath = path.join(__dirname, "../../project_files/excel/project.xlsx");
        xlsx.writeFile(workbook, filePath);

        return response.status(200).json({ Status: "Success", message: "Archivo de Excel creado correctamente."});
    }
	catch (err) {
        return response.status(500).json({ Error: err.message });
    }
});

router.get("/project/excel", async (request, response) => {
	try {
        const filePath = path.join(__dirname, "../../project_files/excel/project.xlsx");

		if (!fs.existsSync(filePath)) {
            return response.status(404).json({ Error: "El archivo no existe." });
        }

        return response.download(filePath, "project.xlsx", (err) => {
            if (err) {
                return response.status(500).json({ Error: "Error al descargar el archivo." });
            }
        });

	}
	catch (err) {
		return response.status(500).json({Error: err.message});
	}
})


module.exports = router;
