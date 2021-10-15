const express = require("express");
const routes = express.Router();

const ItemController = require("../app/controllers/ItemController");
const jwtSessionValidator = require("../app/validators/jsonWebTokenSession")
const itemValidator = require("../app/validators/item")

routes.get("/list", itemValidator.index, jwtSessionValidator.verifyJWT, ItemController.index);

module.exports = routes;