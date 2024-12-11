const fs = require('fs');
const path = require('path');
const { makeFolder } = require('../Folders/makeFolder');

const createHTML = async (htmlTemplate, tmpDir) => {
	const htmlFilePath = path.join(tmpDir, `index.html`);

	if (!fs.existsSync(tmpDir)) {
		await makeFolder(tmpDir);
	}

	fs.writeFileSync(htmlFilePath, htmlTemplate, 'utf8');
}

module.exports = { createHTML };