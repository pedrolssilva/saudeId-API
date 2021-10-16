require("dotenv-safe").config();
require('express-async-errors');
const express = require('express');
const cors = require("cors");
const routes = require("./routes");

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes);

server.use((error, req, res, next) => {
  res.status(500).json(error);
})

server.listen(process.env.PORT || 5000, () => { console.log('Server is running')})