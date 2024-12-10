const express = require("express");

const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./app.properties.ini');

const fileRouter = require("./file")
const pdfRouter = require("./pdf")
const pgrRouter = require("./pgr")


const routerApi = (app) => {
	const router = express.Router();
	app.use(`/${properties.get("app.api.structure")}/v1`, router);

	// Routes

	router.use("/file", fileRouter);
	router.use("/pdf", pdfRouter);
	router.use("/pgr", pgrRouter);
}

module.exports = routerApi;