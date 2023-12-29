const express = require('express');
const App = express();

const { PokemonController } = require('../../../modules/controllers');

App.get('/list', PokemonController.list)
App.get('/detail/:id', PokemonController.detail)
App.get('/list/caught', PokemonController.caught_list)
App.post('/catch', PokemonController.catch)
App.put('/rename/:id', PokemonController.rename)
App.put('/release/:id', PokemonController.release)

module.exports = App;
