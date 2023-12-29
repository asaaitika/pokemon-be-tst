require('dotenv').config();
const { Router } = require('express');

const App = new Router();

const pokemonRoutes = require('./pokemon');

App.use(`/pokemon`, pokemonRoutes);

module.exports = App;
