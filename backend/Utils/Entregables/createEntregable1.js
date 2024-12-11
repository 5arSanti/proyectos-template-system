const fs = require('fs');
const path = require('path');

const archiver = require("archiver");
const { getRandomNumber } = require('../getRandomNumber');

const createEntregable1 = (data) => {
	try {
		const tmpDir = path.join(__dirname, '/backend/entregables/tmp');
        const htmlFilePath = path.join(tmpDir, `index.html`);

        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }

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

		fs.writeFileSync(htmlFilePath, htmlTemplate, 'utf8');

		const outputDir = path.join(__dirname, `../../entregables/lotes/Entregable 1/${data.region}`);
        const zipFilePath = path.join(outputDir, `${data.Nombre}.zip`);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip', { zlib: { level: 9 } });


        archive.on('error', (err) => {
            throw err;
        });

        archive.pipe(output);
        archive.directory(tmpDir, false);
        archive.finalize();
	}
	catch (err) {
		throw new Error(err);
	}
}

module.exports = { createEntregable1 };