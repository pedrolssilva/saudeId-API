const express = require("express");
const routes = express.Router();

routes.get("/", function(req, res){
  return res.json({success: "ok"})
})

const login = require("./login");

routes.use("/login", login);

module.exports = routes;