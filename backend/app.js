const config = require("./utils/config")
const express = require('express')
const app = express()
const pokemonRoutes = require("./routes/pokedexMemRoute");
const logger = require("./utils/logger")

app.use('/api', pokemonRoutes);

module.exports = app