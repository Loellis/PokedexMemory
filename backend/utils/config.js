require("dotenv").config()

const PORT = process.env.PORT
const POKEAPI_URL = process.env.POKEAPI_URL

module.exports = {
  PORT,
  POKEAPI_URL
}