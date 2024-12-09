const path = require('path');
const fs = require('fs').promises;

const { replaceInDoc } = require("./docx/replacePlaceholders");
const { handleBootcampValues } = require('./handleBootcampValues');
const { convertDocxBufferToPdfBuffer } = require('./convertDocxToPdf');

const createOutputFile = async (jsonData, filename="", bootcamp="", errorLog) => {

	const bootcampValues = handleBootcampValues(bootcamp);

	const promises = jsonData.map(async (json, index) => {

		// if (Object.keys(json).length < 34) {
		// 	errorLog.push({
		// 		message: "El archivo no tiene la cantidad de columnas necesarias (Tiene menos de 34 columnas)",
		// 		filename: filename,
		// 		row: index + 2
		// 	})
		// 	return;
		// }

		const templateBuffer = await fs.readFile(path.join(__dirname, '../project_files', "template", 'template.docx'));
		const hpTemplateBuffer = await fs.readFile(path.join(__dirname, '../project_files', "template", 'hp_template.docx'));


		const outputPath = path.resolve(__dirname, '../project_files', "output", `${bootcamp}`, "proyectos", `${bootcamp}_${filename}_${index + 1}.docx`);
		const outputBufffer = await replaceInDoc(templateBuffer, {...json, ...bootcampValues});
		const outputPdfBuffer = convertDocxBufferToPdfBuffer(outputBufffer)
		await fs.writeFile(outputPath, outputPdfBuffer);


		const hpOutputPath = path.resolve(__dirname, '../project_files', "output", `${bootcamp}`, "hp", `HP_${bootcamp}_${filename}_${index + 1}.docx`);
		const hpOutputBufffer = await replaceInDoc(hpTemplateBuffer, json);
		const hpOutputPdfBuffer = convertDocxBufferToPdfBuffer(hpOutputBufffer)

		await fs.writeFile(hpOutputPath, hpOutputPdfBuffer);
	});

	await Promise.all(promises);
}

module.exports = { createOutputFile };