const path = require('path');
const fs = require('fs').promises;

const resetFolder = async (folder) => {
	if (!folder) {
		throw new Error("Folder name is required");
	}

	const folderPath = path.resolve(__dirname, `../project_files/${folder}`);

	await fs.rm(folderPath, { recursive: true, force: true })
	await makeFolder(`${folder}`);
	await makeFolder(`${folder}/hp`);
	await makeFolder(`${folder}/proyectos`);
}


const makeFolder = async (folder) => {
	if (!folder) {
		throw new Error("Folder name is required");
	}

	const folderPath = path.resolve(__dirname, `../project_files/${folder}`);

	await fs.mkdir(folderPath);
}

module.exports = { resetFolder };