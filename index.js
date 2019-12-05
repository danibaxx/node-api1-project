// implement your API here
const express = require('express')
const db = require('./data/db');

const app = express()

app.use(express.json())

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running http://${hostname}:${port}/api`)
})