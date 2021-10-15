const express = require("express");
const routes = express.Router();

const LoginController = require("../app/controllers/LoginController");
const loginValidator = require("../app/validators/login")

routes.post("/create", loginValidator.create, LoginController.create);
routes.post("/in", loginValidator.login, LoginController.login);
routes.post("/out", loginValidator.logout, LoginController.logout);

module.exports = routes;