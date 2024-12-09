const handleBootcampValues = (bootcamp) => {
	let bootcampValues = {
		"ia": "",
		"ada": "",
		"pgr": "",
	};

	switch (bootcamp) {
		case "Programacion":
			bootcampValues = {
				ia: "",
				ada: "",
				pgr: "x",
			}; break;
		case "Analisis de datos":
			bootcampValues = {
				ia: "",
				ada: "x",
				pgr: "",
			}; break;
		case "Inteligencia artificial":
			bootcampValues = {
				ia: "x",
				ada: "",
				pgr: "",
			}; break;
	}

	return bootcampValues;
}

module.exports = { handleBootcampValues };