const express = require('express')
const app = express()
require('dotenv').config("../.env")
const port = process.env.PORT || 5000
const Routers = require("./routers/main")

app.get('/' , Routers);

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))