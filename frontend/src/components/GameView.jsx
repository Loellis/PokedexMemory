import React, { useState } from "react"
import { fetchRandomPokemon } from "../services/pokemonService"

const GameView = ({ pokemonData , onContinue }) => {
  const [guessName, setGuessName] = useState('');
  const [feedbackName, setFeedbackName] = useState('');
  const [guessId, setGuessId] = useState('');
  const [feedbackId, setFeedbackId] = useState('');

  const handleNewGame = async () => {
    onContinue()
    setGuessName('');
    setFeedbackName('');
    setGuessId("")
    setFeedbackId("")
  };

  const handleGuessName = () => {
    if (guessName.toLowerCase() === pokemonData.name) {
      setFeedbackName('Correct!');
    } else {
      setFeedbackName('Incorrect. Try again.');
    }
    // Clear the guess input field
    setGuessName('');
  }

  const handleGuessId = () => {
    console.log(typeof pokemonData.pokedexEntry)
    if (parseInt(guessId) === pokemonData.pokedexEntry) {
      setFeedbackId("Correct!")
    } else {
      setFeedbackId("Incorrect. Try again.")
    }
    // Clear input field
    setGuessId("")
  }

  return (
    <div>
      {pokemonData && (
        <div>
          <img src={pokemonData.sprites} alt="Image of a pokemon" />
          <br />
          <input
            type="text"
            placeholder="Enter your guess"
            value={guessName}
            onChange={(e) => setGuessName(e.target.value)}
          />
          <button onClick={handleGuessName}>Submit Guess</button>
          <p>{feedbackName}</p>
          <input
            type="number"
            placeholder="Enter your guess"
            value={guessId}
            onChange={(e) => setGuessId(e.target.value)}
          />
          <button onClick={handleGuessId}>Submit Guess</button>
          <p>{feedbackId}</p>
          <button onClick={handleNewGame}>New Pokémon</button>
        </div>
      )}
    </div>
  )
}

export default GameView