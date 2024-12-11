const fs = require('fs').promises;

const makeFolder = async (folderPath) => {
	if (!folderPath) {
		throw new Error("Folder name is required");
	}

	await fs.mkdir(folderPath, { recursive: true });
}

module.exports = { makeFolder };