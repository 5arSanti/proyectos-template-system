const fs = require('fs').promises;

const deleteFolder = async (folderPath) => {
	if (!folderPath) {
		throw new Error("Folder name is required");
	}

	await fs.rm(folderPath, { recursive: true, force: true })
}

module.exports = { deleteFolder };