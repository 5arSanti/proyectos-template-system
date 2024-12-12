const fs = require('fs').promises;
const path = require('path');

const { zipFolder } = require('../ZIP/zipFolder');
const { createHTML } = require('../files/createHTML');
const { makeFolder } = require('../Folders/makeFolder');
const { deleteFolder } = require('../Folders/deleteFolder');
const { createFile } = require('../files/createFile');
const { generateRandomColor } = require('../generateRandomColor');

const createEntregable6 = async (data) => {
	try {
		const email = data.Nombre.replace(/ /g, "_");

		const htmlTemplate = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta name=" Haz crecer tu negocio a tu manera con ProdArt" content= "Sombreros,Mochilas,Hamacas,Bolsos." >
				<title>ProdArt</title>
				<!-- iconos-->
				<link rel="apple-touch-icon" href="assets/img/">
				<!-- css-->
				<link rel="stylesheet" href="assets/css/bootstrap.min.css">
				<link rel="stylesheet" href="assets/css/templatemo.css">
				<link rel="stylesheet" href="assets/css/custom.css">
				<link rel="stylesheet" href="assets/css/fontawesome.min.css">
				<link rel="stylesheet" href="./app.css">
				<link rel="stylesheet" href="./main.css">

			</head>
			<body>
				<!-- inicio encabezado-->
				<nav class="navbar navbar-expand-lg bg-dark navbar-light" id="templatemo_nav_top">
					<div class="container text-light">
						<div class="w-100 d-flex justify-content-between">
							<div>
								<i class="fa fa-envelope mx-2"></i>
								<a class="navbar-sm-brand text-light text-decoration-none" href="mailto:info@prodart.com">${email}@prodart.com</a>
								<i class="fa fa-phone mx-2"></i>
								<a class="navbar-sm-brand text-light text-decoration-none" href="tel: 057-320-202-02-02">057-320-202-02-02</a>
							</div>
							<div>
								<a class="text-light" href="https://fb.com/templatemo" target="_blank" rel="sponsored"><i class="fab fa-facebook-f fa-sm fa-fw me-2"></i></a>
								<a class="text-light" href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram fa-sm fa-fw me-2"></i></a>
								<a class="text-light" href="https://twitter.com/" target="_blank"><i class="fab fa-twitter fa-sm fa-fw me-2"></i></a>
							</div>
						</div>

					</div>
				</nav>
				<!-- fin encabezado-->
				<!-- inicio menu-->
					<!-- Header -->
				<nav class="navbar navbar-expand-lg navbar-light shadow">
					<div class="container d-flex justify-content-between align-items-center">

						<a class="navbar-brand text-success logo h1 align-self-center" href="index.html">
							ProdArt
						</a>
						<!-- fecha -->

						<div id="date-display"></div>

						<script type="module">
							import { generateDate } from './assets/din/js/generateDate.mjs';

							const date = generateDate();
							document.getElementById('date-display').innerHTML = date;
						</script>

						<button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>

						<div class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
							<div class="flex-fill">
								<ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
									<li class="nav-item">
										<a class="nav-link" href="index.html">Home</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="acercade.html">A cerca de</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="compras.html">Compras</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="productos.html">Productos</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="contacto.html">Contacto</a>
									</li>
								</ul>
							</div>
							<div class="navbar align-self-center d-flex">
								<div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
									<div class="input-group">
										<input type="text" class="form-control" id="inputMobileSearch" placeholder="Buscar ...">
										<div class="input-group-text">
											<i class="fa fa-fw fa-search"></i>
										</div>
									</div>
								</div>
								<a class="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#templatemo_search">
									<i class="fa fa-fw fa-search text-dark mr-2"></i>
								</a>
								<a class="nav-icon position-relative text-decoration-none" href="compras.html">
									<i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
									<span id="carrito-value" class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark"></span>
								</a>
								<a class="nav-icon position-relative text-decoration-none" href="#">
									<i class="fa fa-fw fa-user text-dark mr-3"></i>
									<span id="contador" class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark"></span>
								</a>
							</div>
						</div>

					</div>
				</nav>
				<!-- fin menu-->
				<!-- Modal -->
				<div class="modal fade bg-white" id="templatemo_search" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg" role="document">
						<div class="w-100 pt-1 mb-5 text-right">
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<form action="" method="get" class="modal-content modal-body border-0 p-0">
							<div class="input-group mb-2">
								<input type="text" class="form-control" id="inputModalSearch" name="q" placeholder="Buscar ...">
								<button type="submit" class="input-group-text bg-success text-light">
									<i class="fa fa-fw fa-search text-white"></i>
								</button>

							</div>
							<p><br>Escriba el producto a Buscar ...</p>
						</form>
					</div>
				</div>


				<!-- inicio secciones-->
			<!-- carrusel -->
			<div id="template-mo-zay-hero-carousel" class="carousel slide" data-bs-ride="carousel">
				<ol class="carousel-indicators">
					<li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" class="active"></li>
					<li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
					<li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="2"></li>
				</ol>
				<div class="carousel-inner">

				</div>
				<a class="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
					<i class="fas fa-chevron-left"></i>
				</a>
				<a class="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
					<i class="fas fa-chevron-right"></i>
				</a>
			</div>
			<!-- fin carrusel -->
				<section class="container py-5">
					<div class="row text-center pt-3">
						<div class="col-lg-6 m-auto">
							<h1 class="h1">Categorías del mes...</h1>
							<p>
								Esta son la categorias mas vendidas del mes de octubre.....
							</p>
						</div>
					</div>
					<div class="row" id="categories-container">

					</div>


				</section>
				<section class="bg-light">
					<div class="container py-5">
						<div class="row text-center py-3">
							<div class="col-lg-6 m-auto">
								<h1 class="h1">Productos destacados...</h1>
								<p>
									Los productos destacados del mes son:
								</p>
							</div>
						</div>

					<div class="row" id="products-container">

					</div>
				</div>
			</section>

				<!-- fin secciones-->

				<!-- inicio de pie-->
				<footer class="bg-dark" id="templatemo_footer">
					<div class="container">
						<div class="row">
							<div class="col-md-4 pt-5">
								<h2 class="h2 text-success border-bottom pb-3 border-light log">ProdArt</h2>
								<ul class="list-unstyled text-light footer-link-list">
									<li>
										<i class="fas fa-map-marker-alt fa-fw"></i>
										Local principal - Bogotá - Colombia
									</li>

									<li>
										<i class="fa fa-phone fa-fw"></i>
										<a class="text-decoration-none" href="tel: 057-320-202-02-02">057-320-202-02-02</a>
									</li>
									<li>
										<i class="fa fa-envelope mx-2"></i>
										<a class="text-decoration-none" href="mailto:info@prodart.com">${email}@prodart.com</a>
									</li>
								</ul>
							</div>
							<div class="col-md-4 pt-5">
								<h2 class="h2 text-light border-bottom pb-3 border-light">Productos</h2>
								<ul class="list-unstyled text-light footer-link-list">
									<li><a class="text-decoration-none" href="compras.html">Sombreros</a></li>
									<li><a class="text-decoration-none" href="compras.html">Hamacas</a></li>
									<li><a class="text-decoration-none" href="compras.html">Platería</a></li>
									<li><a class="text-decoration-none" href="compras.html">Bolsos</a></li>
									<li><a class="text-decoration-none" href="compras.html">Mochilas</a></li>
									<li><a class="text-decoration-none" href="compras.html">Tapetes</a></li>
								</ul>
							</div>
							<div class="col-md-4 pt-5">
								<h2 class="h2 text-light border-bottom pb-3 border-light">Mas información</h2>
								<ul class="list-unstyled text-light footer-link-list">
									<li><a class="text-decoration-none" href="index.html">Home</a></li>
									<li><a class="text-decoration-none" href="acercade.html">A cerca de</a></li>
									<li><a class="text-decoration-none" href="compras.html">Compras</a></li>
									<li><a class="text-decoration-none" href="productos.html">Productos</a></li>
									<li><a class="text-decoration-none" href="contacto.html">Contacto</a></li>
								</ul>
							</div>
						</div>

						<div class="row text-light mb-4">
							<div class="col-12 mb-3">
								<div class="w-100 my-3 border-top border-light"></div>
							</div>
							<div class="col-auto me-auto">
								<ul class="list-inline text-left footer-icons">
									<li class="list-inline-item border border-light rounded-circle text-center">
										<a class="text-light text-decoration-none" target="_blank" href="http://facebook.com/"><i class="fab fa-facebook-f fa-lg fa-fw"></i></a>
									</li>
									<li class="list-inline-item border border-light rounded-circle text-center">
										<a class="text-light text-decoration-none" target="_blank" href="https://www.instagram.com/"><i class="fab fa-instagram fa-lg fa-fw"></i></a>
									</li>
									<li class="list-inline-item border border-light rounded-circle text-center">
										<a class="text-light text-decoration-none" target="_blank" href="https://twitter.com/"><i class="fab fa-twitter fa-lg fa-fw"></i></a>
									</li>

								</ul>
							</div>
							<div class="col-auto">
								<label class="sr-only" for="subscribeEmail">Escriba su Email</label>
								<div class="input-group mb-2">
									<input type="text" class="form-control bg-dark border-light" id="subscribeEmail" placeholder="Email address">
									<div class="input-group-text btn-success text-light">Subscribirse</div>
								</div>
							</div>
						</div>


					</div>
					<div class="w-100 bg-black py-3">
						<div class="container">
							<div class="row pt-2">
								<p class="text-left text-light">
									Copyright &copy; 2024 - ProdArt | Diseñado por ${data.Nombre}
								</p>
							</div>
						</div>
					</div>
				</footer>
				<!-- fin de pie-->
					<!-- archivos js-->
					<script src="assets/js/bootstrap.bundle.min.js"></script>
					<script src="assets/js/jquery-migrate-1.2.1.min.js"></script>
					<script src="assets/js/jquery-1.11.0.min.js"></script>
					<script src="assets/js/templatemo.js"></script>
					<script src="assets/js/custom.js"></script>
					<script src="assets/js/carrito.js"></script>

					<script src="assets/din/js/backup-bd/bd.mjs"></script>
					<script src="assets/din/js/backup-bd/categories.mjs"></script>
					<script src="assets/din/js/carrouselItem.mjs"></script>
					<script src="assets/din/js/categoryCard.mjs"></script>
					<script src="assets/din/js/fetchCategories.mjs"></script>
					<script src="assets/din/js/fetchProducts.mjs"></script>
					<script src="assets/din/js/generateDate.mjs"></script>
					<script src="assets/din/js/getRandomNumber.mjs"></script>
					<script src="assets/din/js/productCard.mjs"></script>
					<script src="assets/din/js/main.mjs"></script>
			</body>
			</html>
        `;

		const srcDir = path.join(__dirname, '../../entregables/files/e6');
		const tmpDir = path.join(__dirname, '../../entregables/tmp');

		await deleteFolder(tmpDir);
		await makeFolder(tmpDir);

		await fs.cp(srcDir, tmpDir, { recursive: true });

		const cssTemplate = `
			:root {
				--pallete-1: ${generateRandomColor()};
				--pallete-2: ${generateRandomColor()};
				--pallete-3: ${generateRandomColor()};
			}
		`;

		await createFile(cssTemplate, tmpDir, 'main.css');

		await createHTML(htmlTemplate, tmpDir);

		await zipFolder(`Entregable 6_${data.Nombre}`, `${data.region}/${data.Nombre}/`, tmpDir);

	}
	catch (err) {
		throw new Error(err);
	}
}

module.exports = { createEntregable6 };