const express = require("express");

const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./app.properties.ini');

const fileRouter = require("./file")
const pdfRouter = require("./pdf")


const routerApi = (app) => {
	const router = express.Router();
	app.use(`/${properties.get("app.api.structure")}/v1`, router);

	// Routes

	router.use("/file", fileRouter);
	router.use("/pdf", pdfRouter);
}

module.exports = routerApi;