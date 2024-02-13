const fs = require("fs")
const logger = require("./logger")

const writeDataLocally = (data, fileName) => {
  try {
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFileSync(fileName, jsonData)
    logger.info(`Data was successfully written to: ${fileName}`)
  } catch (error) {
    logger.error(`Error writing data to file: ${fileName}`, error.message)
  }
}

const appendDataLocally = (data, fileName) => {
  try {
    let existingDataJson = []

    // Check if file exists
    if (fs.existsSync(fileName)) {
      const existingData = fs.readFileSync(fileName, "utf-8")
      existingDataJson = JSON.parse(existingData)
    }
    
    existingDataJson.push(data)
    fs.writeFileSync(fileName, JSON.stringify(existingDataJson, null, 2))
    logger.info(`Successfully appended data to: ${fileName}`)
  } catch (error) {
    logger.error(`Error appending data to file: ${fileName}`, error.message)
  }
}

const readLocalData = (fileName) => {
  try {
    const data = fs.readFileSync(fileName, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    logger.error(`Error reading data from file: ${fileName}`, error.message)
  }

}

module.exports = { writeDataLocally, appendDataLocally, readLocalData }