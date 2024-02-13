const express = require("express")
const router = express.Router()
const logger = require("../utils/logger")
const fileUtils = require("../utils/fileUtils")
const pokeapiService = require("../services/pokeapi")

router.get("/fetch-pokemon-urls", (req, res) => {
  pokeapiService.fetchPokemonData()
    .then(pokemonData => {
      logger.info(pokemonData)
      fileUtils.writeDataLocally(pokemonData, "../data/pokemon-urls.json")
      res.json({ success: true, message: "Successfully fetched data from pokeApi."})
    })
    .catch(error => {
      logger.error("Failed to fetch data from pokeApi:", error.message)
      res.status(500).json({ success: false, message: "Failed to fetch data from pokeApi."})
    })
})

router.get("/fetch-pokemon-details", async (req, res) => {
  try {
    const pokemonUrls = fileUtils.readLocalData("../data/pokemon-urls.json")
    for (const pokemon of pokemonUrls.results) {
      try {
        const pokemonDetails = await pokeapiService.fetchPokemonDetails(pokemon)
        fileUtils.appendDataLocally(pokemonDetails, "../data/pokemon-details.json")
        logger.info(`Successfully stored ${pokemon.name} in pokemon-details.json`)
      } catch (error) {
        logger.error(`Failed to fetch details for ${pokemon.name} from pokeApi:`, error.message)
        return res.status(500).json({ success: false, message: "Failed to fetch details from pokeAPI."})
      }
      // Wait for 1 second before moving to the next iteration
      await new Promise(resolve => setTimeout(resolve, 1000));
      logger.info("Waiting for next pokemon.");
    }
    res.json({ success: true, message: "Successfully fetched all details from pokeAPI." })
  } catch (error) {
    logger.error("Something went wrong when trying to read local file", error)
    res.status(500).json({ success: false, message: "Failed to read local file." })
  }
})

module.exports = router