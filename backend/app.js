const config = require("./utils/config")
const express = require('express')
const app = express()
const pokemonRoutes = require("./routes/pokedexMemRoute");
const cors = require("cors")

app.use(cors())
app.use('/api', pokemonRoutes);

module.exports = app