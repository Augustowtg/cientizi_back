const express = require('express');
const app = express();

app.use(express.json());
require('dotenv').config("../.env");
require('./database/db');

app.get("/", (req, res, next) => {
    res.send('Aplicação esta online')
});

require("./routers/index")(app);

// Inicialização 
app.listen(process.env.PORT, () => {
    console.log(`==> Server is up and running on port : ${process.env.port}`);
});