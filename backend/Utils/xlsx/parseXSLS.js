const xlsx = require("xlsx");
const { deleteFile } = require("../files/deleteFile");

const parseXLSX = async (file) => {
	const workbook = xlsx.readFile(file.path);
	const sheetName = workbook.SheetNames[0];
	const sheet = workbook.Sheets[sheetName];
	const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: null });

	await deleteFile(file.path);

	return jsonData
}

module.exports = { parseXLSX };