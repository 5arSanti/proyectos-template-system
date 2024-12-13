import { handleGetFile } from "./handleData/handleFiles";
import { handleNotifications } from "./handleNotifications";
import moment from "moment";

const handleDownload = (url, name) => {
    const pdfUrl = url;
    const link = document.createElement("a");

    link.href = pdfUrl;
    link.download = name;
    link.click();
    handleNotifications("info", `Se descargó ${name}`);
}

const handleDownloadFile = async (uri, name,) => {
    let date = new Date();

    if (!name) {
        name = `Lote de Archivos - ${moment(date).format("DD-MM-YYYY_hh-mm")}.zip`
    }

    try {
        const file = await handleGetFile(uri)
        const url = window.URL.createObjectURL(file);
    
        handleDownload(url, name);
    } 
    catch (err) {
        handleNotifications("error", err.message);
    }
}

export { handleDownload, handleDownloadFile }