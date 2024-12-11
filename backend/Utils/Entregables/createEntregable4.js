const path = require('path');

const { zipFolder } = require('../ZIP/zipFolder');
const { createHTML } = require('../files/createHTML');
const { createCSS } = require('../files/createCSS');
const { createMainJS } = require('../files/createMainJS');

const createEntregable4 = async (data) => {
	try {
		const htmlTemplate = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Sobre Mi ${data.Nombre}</title>

			    <link rel="stylesheet" href="./styles.css">

			</head>
			<body>
				<div id="about-me">
					<h1>¡Hola! Mi nombre es ${data.Nombre || ""}</h1>

					<p>
						${data.descripcion || ""}
					</p>

					<img src="${data.imagen || ""}" alt="Logo">
				</div>

				<div id="links">
					<a href="https://www.youtube.com/">YouTube</a>
					<a href="https://github.com/">GitHub</a>
				</div>

				<div class="hobbies">
					<h1>Pasatiempos</h1>
					<ul>
						${data.pasatiempos.map((item) =>
							`<li>${item || ""}</li>`).join('')
						}
					</ul>
				</div>

				<div class="tasks">
					<h1>Cosas pendientes</h1>
					<ol>
						${data.tareas.map((item) =>
							`<li>${item || ""}</li>`).join('')
						}
					</ol>
				</div>

				<div class="schedule">
					<table border="1">
						<thead>
							<tr>
								<th>Lunes</th>
								<th>Martes</th>
								<th>Miercoles</th>
								<th>Jueves</th>
								<th>Viernes</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>${data.tareas[0] || ""}</td>
								<td></td>
								<td>${data.tareas[1] || ""}</td>
								<td></td>
								<td>${data.tareas[3] || ""}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="contact-form">
					<h1>Contactame!</h1>
					<form action="">
						<input required type="text" id="nombre" placeholder="Nombre">
						<input required type="text" id="descripcion" placeholder="Descripcion">
						<input required type="email" id="correo" placeholder="Correo">
						<button type="submit">Enviar informacion</button>
					</form>
				</div>

				<script src="./main.js"></script>
			</body>
			</html>
        `;

		const tmpDir = path.join(__dirname, '../../entregables/tmp');

		createCSS(data.styles, tmpDir);

		createMainJS(tmpDir);

		await createHTML(htmlTemplate, tmpDir);

		await zipFolder(data.Nombre, `Entregable 4/${data.region}`, tmpDir)

	}
	catch (err) {
		throw new Error(err);
	}
}

module.exports = { createEntregable4 };