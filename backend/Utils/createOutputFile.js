const path = require('path');
const fs = require('fs').promises;

const { replaceInDoc } = require("./docx/replacePlaceholders");

const createOutputFile = async (jsonData, filename="") => {

	const outputPath = path.resolve(__dirname, '../project_files/output');

	await fs.rm(outputPath, { recursive: true, force: true })
	await fs.mkdir(outputPath)

	const promises = jsonData.map(async (json, index) => {
		const templateBuffer = await fs.readFile(path.join(__dirname, '../project_files', "template", 'template.docx'));

		const outputBufffer = await replaceInDoc(templateBuffer, json);

		const outputPath = path.resolve(__dirname, '../project_files', "output", `${filename}_${index + 1}.docx`);

		await fs.writeFile(outputPath, outputBufffer);
	});

	await Promise.all(promises);
}

module.exports = { createOutputFile };