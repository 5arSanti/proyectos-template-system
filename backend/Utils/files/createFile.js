const fs = require('fs');
const path = require('path');
const { makeFolder } = require('../Folders/makeFolder');

const createFile = async (htmlTemplate, tmpDir, fileName="index.html") => {
	const htmlFilePath = path.join(tmpDir, fileName);

	await makeFolder(tmpDir);

	fs.writeFileSync(htmlFilePath, htmlTemplate, 'utf8');
}

module.exports = { createFile };