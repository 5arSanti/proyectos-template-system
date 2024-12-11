const fs = require('fs');
const path = require('path');

const createMainJS = (tmpDir) => {
	const mainJSDir = path.join(__dirname, '../../entregables/files/e4', "main.js");

	const tmpStylesPath = path.join(tmpDir, 'main.js');

	fs.copyFileSync(mainJSDir, tmpStylesPath);
};

module.exports = { createMainJS };