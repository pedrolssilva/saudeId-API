const express = require("express");
const routes = express.Router();

const ItemController = require("../app/controllers/ItemController");
const jwtSessionValidator = require("../app/validators/jsonWebTokenSession")

routes.get("/list", jwtSessionValidator.verifyJWT, ItemController.index);

module.exports = routes;