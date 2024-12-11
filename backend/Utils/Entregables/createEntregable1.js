const path = require('path');

const { zipFolder } = require('../ZIP/zipFolder');
const { createHTML } = require('../files/createHTML');

const createEntregable1 = async (data) => {
	try {
		const htmlTemplate = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Sobre Mi ${data.Nombre}</title>
			</head>
			<body>
				<div>
					<h1>¡Hola! Mi nombre es ${data.Nombre || ""}</h1>

					<p>
						${data.descripcion || ""}
					</p>

					<img src="${data.imagen || ""}" alt="Logo">
				</div>

				<div>
					<a href="https://www.youtube.com/">YouTube</a>
					<a href="https://github.com/">GitHub</a>
				</div>

				<div>
					<h1>Pasatiempos</h1>
					<ul>
						${data.pasatiempos.map((item) =>
							`<li>${item || ""}</li>`).join('')
						}
					</ul>
				</div>

				<div>
					<h1>Cosas pendientes</h1>
					<ol>
						${data.tareas.map((item) =>
							`<li>${item || ""}</li>`).join('')
						}
					</ol>
				</div>

				<div>
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

				<div>
					<h1>Contactame!</h1>
					<form action="">
						<input type="text" placeholder="Nombre">
						<input type="text" placeholder="Descripcion">
						<input type="email" placeholder="Correo">
						<button type="submit">Enviar informacion</button>
					</form>
				</div>
			</body>
			</html>
        `;

		const tmpDir = path.join(__dirname, '../../entregables/tmp');

		createHTML(htmlTemplate, tmpDir);

		zipFolder(data.Nombre, `Entregable 1/${data.region}`, tmpDir)

	}
	catch (err) {
		throw new Error(err);
	}
}

module.exports = { createEntregable1 };