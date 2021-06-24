const express = require('express');
const morgan = require('morgan')
const passport = require('passport');

// Gerais
require('dotenv').config("../.env");
require('./database/db');
require('./config/passport');

// Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());
app.get("/", (req, res, next) => {
    res.send('Aplicação esta online')
});

// Rotas
require("./routers/projectRouter")(app);
require("./routers/userRouter")(app);

// Inicialização 
app.listen(process.env.PORT, () => {
    console.log(`==> Server is up and running on port : ${process.env.port}`);
});