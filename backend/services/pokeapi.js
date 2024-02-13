const axios = require('axios');
const logger = require("../utils/logger")
const config = require("../utils/config")

// Fetch first gen pokemon
const fetchPokemonData = () => {
  return axios.get(config.POKEAPI_URL)
          .then(response => response.data)
          .catch(error => logger.error("Error fetching data from PokeAPI:", error))
}

// Fetch pokemon details
const fetchPokemonDetails = async (pokemon) => {
  return await axios.get(pokemon.url)
          .then(response => response.data)
          .catch(error => logger.error(`Error fetching details on pokemon: ${pokemon.name} from pokeAPI:`, error))
}


module.exports = { fetchPokemonData, fetchPokemonDetails }
