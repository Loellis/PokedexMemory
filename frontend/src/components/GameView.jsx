import React, { useState } from "react"
import { isGuessCloseEnough } from "../utils/utils"

const GameView = ({ 
    pokemonData, 
    morePokemon, 
    updateScore,
    score,
    timer,
    updateFeedback
  }) => {
  const [guessName, setGuessName] = useState("")
  const [guessId, setGuessId] = useState("")

  const handleCheckAnswer = (name, index) => {
    if (name.toLowerCase() === pokemonData.name.toLowerCase() && parseInt(index) === pokemonData.pokedexEntry) {
      updateScore(2)
      updateFeedback("You guessed both Pokédex entry and the name correctly!")
    } else if (name.toLowerCase() === pokemonData.name.toLowerCase() && parseInt(index) !== pokemonData.pokedexEntry) {
      updateScore(1)
      updateFeedback(`You guessed the name correctly, but the Pokédex entry was wrong. Your guess: ${index}. Correct Answer: ${pokemonData.pokedexEntry}`)
    } else if (name.toLowerCase() !== pokemonData.name.toLowerCase() && parseInt(index) === pokemonData.pokedexEntry) {
      if (isGuessCloseEnough(name, pokemonData.name)) {
        updateScore(2)
        updateFeedback(`Your name guess was close enough (${name})! You misspelled ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}. The Pokédex entry was correctly guessed.`)
      } else {
        updateScore(1)
        updateFeedback(`You guessed the wrong name, but the Pokédex entry was correct. Your guess: ${name}. Correct answer: ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}`)
      }
    } else {
      if (isGuessCloseEnough(name, pokemonData.name)) {
        updateScore(1)
        updateFeedback(`Your name guess was close enough (${name})! You misspelled ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}. The Pokédex entry was incorrect. Your Pokédex guess: ${index}. Correct answer: ${pokemonData.pokedexEntry}`)
      } else {
        updateFeedback("Both your guesses were wrong.")
      }
    }

    setGuessId("")
    setGuessName("")
  }

  return (
    <div>
      {pokemonData && (
        <div>
          <img src={pokemonData.sprites} alt="Image of a pokemon" />
          <br />
          {score > 0 && (
            <p>SCORE: {score}</p>
          )}
          <input
            type="text"
            placeholder="Enter Pokémon Name"
            value={guessName}
            required
            onChange={(e) => setGuessName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Pokedex Entry"
            value={guessId}
            required
            onChange={(e) => setGuessId(e.target.value)}
          />
          <button 
            onClick={() => handleCheckAnswer(guessName, guessId)}
            disabled={!guessName || !guessId }
          >
            Submit Answer
          </button>
          <p>Number of Pokémon left: {morePokemon}</p>
          <p>Time played: {timer}</p>
        </div>
      )}
    </div>
  )
}

export default GameView