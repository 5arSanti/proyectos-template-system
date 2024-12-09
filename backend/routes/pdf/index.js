const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const router = express.Router();

// Ruta principal de tus archivos
const INPUT_DIR = './project_files/output';
const OUTPUT_DIR = './project_files/output_pdf';

// Función para convertir archivos DOCX a PDF
const convertDocxToPdf = (inputFilePath, outputFilePath) => {
	return new Promise((resolve, reject) => {
		const command = `soffice --headless --convert-to pdf --outdir "${path.dirname(outputFilePath)}" "${inputFilePath}"`;
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(`Error al convertir ${inputFilePath}: ${stderr}`);
			}
			else {
				resolve(stdout);
			}
		});
	});
};

// Función para recorrer carpetas y procesar archivos
const processDirectory = async (inputDir, outputDir) => {
	const files = await fs.readdir(inputDir);

	for (const file of files) {
		const inputFilePath = path.join(inputDir, file);
		const outputFilePath = path.join(outputDir, file.replace(/\.docx$/, '.pdf'));

		const stat = await fs.stat(inputFilePath);

		if (stat.isDirectory()) {
			await fs.ensureDir(path.join(outputDir, file));
			await processDirectory(inputFilePath, path.join(outputDir, file));
		}
		else if (path.extname(file).toLowerCase() === '.docx') {
			try {
				await convertDocxToPdf(inputFilePath, outputFilePath);
			} catch (error) {
				throw Error(error);
			}
		}
	}
};

// Endpoint para ejecutar la conversión
router.post('/convert', async (request, response) => {
	try {
		// Crear el directorio de salida si no existe
		await fs.ensureDir(OUTPUT_DIR);

		// Procesar todas las carpetas y archivos
		await processDirectory(INPUT_DIR, OUTPUT_DIR);

		return response.json({Status: "Success", message: "Convertidos a PDF correctamente"});
	}
	catch (err) {
		return response.status(500).json({Error: err.message});

	}
});

module.exports = router;