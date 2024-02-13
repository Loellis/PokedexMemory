const fs = require("fs")
const logger = require("./logger")
const path = require("path")

const writeDataLocally = (data, fileName) => {
  try {
    const filePath = path.resolve(__dirname, fileName)
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFileSync(filePath, jsonData)
    logger.info(`Data was successfully written to: ${fileName}`)
  } catch (error) {
    logger.error(`Error writing data to file: ${fileName}`, error.message)
  }
}

const appendDataLocally = (data, fileName) => {
  try {
    let existingDataJson = []
    const filePath = path.resolve(__dirname, fileName)

    // Check if file exists
    if (fs.existsSync(filePath)) {
      const existingData = fs.readFileSync(filePath, "utf-8")
      existingDataJson = JSON.parse(existingData)
    }
    
    existingDataJson.push(data)
    fs.writeFileSync(filePath, JSON.stringify(existingDataJson, null, 2))
    logger.info(`Successfully appended data to: ${fileName}`)
  } catch (error) {
    logger.error(`Error appending data to file: ${fileName}`, error.message)
  }
}

const readLocalData = (fileName) => {
  try {
    const filePath = path.resolve(__dirname, fileName)
    const data = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    logger.error(`Error reading data from file: ${fileName}`, error.message)
  }

}

const formatPokemonData = (pokemonData) => {
  const formattedData = pokemonData.map((pokemon) => {
    return {
      name: pokemon.name,
      pokedexEntry: pokemon.id,
      sprites: pokemon.sprites.other["official-artwork"].front_default,
      types: pokemon.types.map((type) => type.type.name)
    }
  })

  return formattedData
}

module.exports = { writeDataLocally, appendDataLocally, readLocalData, formatPokemonData }