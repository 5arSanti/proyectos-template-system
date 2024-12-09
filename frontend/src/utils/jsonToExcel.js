import * as XLSX from 'xlsx';
import { handleNotifications } from "./handleNotifications";

const jsonToExcel = (json) => {
	try {
		const workbook = XLSX.utils.book_new();

		const worksheet = XLSX.utils.json_to_sheet(json);

		XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

		XLSX.writeFile(workbook, "Reporte de archivos no validos.xlsx");

	} catch (err) {
		handleNotifications("error", err.message);
	}
}

export { jsonToExcel };