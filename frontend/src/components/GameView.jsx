import React, { useState, useRef } from "react"
import { isGuessCloseEnough } from "../utils/utils"
import PokemonImage from "./PokemonImage"
import GuessInput from "./GuessInput"
import GameControls from "./GameContols"

const GameView = ({ pokemonData, morePokemon, updateScore, score, timer, updateFeedback }) => {
  const [guessName, setGuessName] = useState("")
  const [guessId, setGuessId] = useState("")
  const inputRef = useRef(null)

  const handleCheckAnswer = (name, index) => {
    const nameMatches = name.toLowerCase() === pokemonData.name.toLowerCase()
    const entryMatches = parseInt(index) === pokemonData.pokedexEntry
    const nameCloseEnough = isGuessCloseEnough(name, pokemonData.name)

    let scoreIncrement = 0
    let feedbackMessage = ""

    if (nameMatches && entryMatches) {
      scoreIncrement = 2
      feedbackMessage = "You guessed both Pokédex entry and the name correctly!"
    } else if (nameMatches) {
      scoreIncrement = 1
      feedbackMessage = `You guessed the name correctly, but the Pokédex entry was wrong. Your guess: ${index}. Correct Answer: ${pokemonData.pokedexEntry}`
    } else if (entryMatches) {
      if (nameCloseEnough) {
        scoreIncrement = 2
        feedbackMessage = `Your name guess was close enough (${name})! You misspelled ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}. The Pokédex entry was correctly guessed.`
      } else {
        scoreIncrement = 1
        feedbackMessage = `You guessed the wrong name, but the Pokédex entry was correct. Your guess: ${name}. Correct answer: ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}`
      }
    } else {
      if (nameCloseEnough) {
        scoreIncrement = 1
        feedbackMessage = `Your name guess was close enough (${name})! You misspelled ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}. The Pokédex entry was incorrect. Your Pokédex guess: ${index}. Correct answer: ${pokemonData.pokedexEntry}`
      } else {
        feedbackMessage = "Both your guesses were wrong."
      }
    }

    updateScore(scoreIncrement)
    updateFeedback(feedbackMessage)
    setGuessId("")
    setGuessName("")
    inputRef.current.focus()
  }

  return (
    <div>
      {pokemonData && (
        <div>
          <PokemonImage src={pokemonData.sprites}/>
          <GuessInput 
            guessName={guessName}
            guessId={guessId}
            setGuessName={setGuessName}
            setGuessId={setGuessId}
            handleCheckAnswer={handleCheckAnswer}
            inputRef={inputRef}
          />
          <GameControls score={score} morePokemon={morePokemon} timer={timer} />
        </div>
      )}
    </div>
  )
}

export default GameView