const fs = require('fs');
const path = require('path');

const createCSS = (styleNumber, tmpDir) => {
	const stylesFilename = `styles${styleNumber}.css`

	const stylesSourceDir = path.join(__dirname, '../../entregables/files/styles');

	const sourceStylesPath = path.join(stylesSourceDir, stylesFilename);

	const tmpStylesPath = path.join(tmpDir, 'styles.css');

	fs.copyFileSync(sourceStylesPath, tmpStylesPath);

	if (!fs.existsSync(sourceStylesPath)) {
		throw new Error(`El archivo ${stylesFilename} no existe en ${stylesSourceDir}`);
	}

	return
}

module.exports = { createCSS };