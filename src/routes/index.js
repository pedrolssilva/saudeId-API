const express = require("express");
const routes = express.Router();

const login = require("./login");
const item = require("./item");

routes.get("/", function(req, res){
  return res.json({success: "ok"})
})


routes.use("/login", login);
routes.use("/items", item);

module.exports = routes;