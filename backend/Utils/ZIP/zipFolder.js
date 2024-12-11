const fs = require('fs');
const path = require('path');
const archiver = require("archiver");
const { deleteFolder } = require('../Folders/deleteFolder');
const { makeFolder } = require('../Folders/makeFolder');


const zipFolder = async (zipName, savePath, tmpDir) => {

	const outputDir = path.join(__dirname, `../../entregables/lotes/${savePath}`);
	const zipFilePath = path.join(outputDir, `${zipName}.zip`);

	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	const output = fs.createWriteStream(zipFilePath);
	const archive = archiver('zip', { zlib: { level: 9 } });


	const zipCompletion = new Promise((resolve, reject) => {
        output.on('close', resolve);
        archive.on('error', reject);
    });

	archive.pipe(output);
	archive.directory(tmpDir, false);
	await archive.finalize();

    await zipCompletion;


    await deleteFolder(tmpDir);
    await makeFolder(tmpDir);
}

module.exports = { zipFolder };