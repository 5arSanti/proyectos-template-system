const mammoth = require('mammoth');
const { PDFDocument } = require('pdf-lib');


const convertDocxBufferToPdfBuffer = async (docxBuffer) => {
	const { value: extractedText } = await mammoth.extractRawText({ buffer: docxBuffer });

	if (!extractedText || extractedText.trim().length === 0) {
		throw new Error('No se pudo extraer texto del archivo .docx.');
	}

	const pdfDoc = await PDFDocument.create();

	const page = pdfDoc.addPage();

	const { width, height } = page.getSize();

	page.drawText(extractedText, {
		x: 50,
		y: height - 50,
		size: 12,
		lineHeight: 14,
		maxWidth: width - 100,
	});

	const pdfBuffer = await pdfDoc.save();

	return pdfBuffer;

};

module.exports = { convertDocxBufferToPdfBuffer };
