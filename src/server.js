require("dotenv-safe").config();
const express = require('express');
const routes = require("./routes");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes);

server.timeout = 50000;
server.listen(3000, () => { console.log('Server is running')})