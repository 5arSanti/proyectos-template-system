const fs = require('fs');
const path = require('path');

const archiver = require("archiver");

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
				<title>Sobre Mi</title>
			</head>
			<body>
				<div>
					<h1>¡Hola! Mi nombre es ${data.Nombre}</h1>

					<p>
						Soy una desarrolladora web full-stack apasionada por crear soluciones innovadoras y funcionales. Tengo experiencia en tecnologías modernas como React, Node.js y MongoDB, y disfruto diseñar interfaces intuitivas y sistemas robustos. Mi enfoque principal está en el desarrollo ágil, optimización del rendimiento y la colaboración en equipo. Fuera del código, me encanta aprender nuevas herramientas tecnológicas y participar en proyectos de impacto social. Si buscas a alguien creativo, dedicado y orientado a resultados, ¡soy la persona adecuada!
					</p>

					<img src="${data.imagen}" alt="Logo">
				</div>

				<div>
					<a href="https://www.youtube.com/">YouTube</a>
					<a href="https://github.com/">GitHub</a>
				</div>

				<div>
					<h1>Pasatiempos</h1>
					<ul>
						<li>Dibujo digital</li>
						<li>Programacion</li>
						<li>Hacer deporte</li>
					</ul>
				</div>

				<div>
					<h1>Cosas pendientes</h1>
					<ol>
						<li>Trabajo</li>
						<li>Hacer el almuerzo</li>
						<li>Lavar la ropa</li>
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
								<td>Hacer el almuerzo</td>
								<td></td>
								<td>Trabajo</td>
								<td></td>
								<td>Lavar la ropa</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div>
					<h1>Formulario de contacto</h1>
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

		const outputDir = path.join(__dirname, `/backend/entregables/lotes/${data.region}`);
        const zipFilePath = path.join(outputDir, `${data.Nombre}.zip`);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            console.log(`ZIP creado exitosamente en: ${zipFilePath} (${archive.pointer()} bytes)`);
        });

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