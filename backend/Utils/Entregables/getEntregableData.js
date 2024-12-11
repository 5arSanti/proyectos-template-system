const { descriptions } = require("../EntregablesData/descriptions")
const { images } = require("../EntregablesData/images")
const { pasatiempos } = require("../EntregablesData/pasatiempos")
const { tareas } = require("../EntregablesData/tareas")
const { getRandomItems } = require("../getRandomItems")
const { getRandomNumber } = require("../getRandomNumber")

const getEntregableData = (json, region) => {
	try {
		const data = {
			Nombre: json.Nombre,
			styles: getRandomNumber(45),
			region: region,
			imagen: images[getRandomNumber(images.length)],
			descripcion: descriptions[getRandomNumber(descriptions.length)],
			pasatiempos: getRandomItems(pasatiempos, getRandomNumber(10)),
			tareas: getRandomItems(tareas, getRandomNumber(10))
		}

		return data;
	}
	catch (err) {
		throw Error(err)
	}
}

module.exports = { getEntregableData }