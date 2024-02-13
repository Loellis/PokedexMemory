import React, { useState, useEffect } from "react"

const GameView = ({ pokemonData , onContinue, onPlayAgain, morePokemon }) => {
  const [guessName, setGuessName] = useState("")
  const [feedbackName, setFeedbackName] = useState("")
  const [guessId, setGuessId] = useState("")
  const [feedbackId, setFeedbackId] = useState("")

  const [notDone, setNotDone] = useState(true)

  const calculateLevenshteinDistance = (s1, s2) => {
    const len1 = s1.length;
    const len2 = s2.length;

    const matrix = [];

    // Initialize the matrix
    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    // Calculate Levenshtein distance
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = s1.charAt(i - 1) === s2.charAt(j - 1) ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // Deletion
                matrix[i][j - 1] + 1, // Insertion
                matrix[i - 1][j - 1] + cost // Substitution
            );
        }
    }

    return matrix[len1][len2];
  }

  const isGuessCloseEnough = (guess, correctAnswer) => {
    const threshold = 2
    return calculateLevenshteinDistance(guess.toLowerCase(), correctAnswer.toLowerCase())
  }

  const handleNextPokemon = async () => {
    onContinue()
    setGuessName("")
    setFeedbackName("")
    setGuessId("")
    setFeedbackId("")
  }

  const handlePlayAgain = () => {
    onPlayAgain()
    setGuessName("")
    setFeedbackName("")
    setGuessId("")
    setFeedbackId("")
  }

  useEffect(() => {
    setNotDone(morePokemon !== 0)
  }, [morePokemon])

  const handleGuessName = () => {
    if (guessName.toLowerCase() === pokemonData.name) {
      setFeedbackName("Correct!")
    } else if (isGuessCloseEnough(guessName, pokemonData.name)) {
      setFeedbackName(`Close enough! You misspelled ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}`)
    } else {
      setFeedbackName("Incorrect. Try again.")
      setGuessName("")
    }
  }

  const handleGuessId = () => {
    if (parseInt(guessId) === pokemonData.pokedexEntry) {
      setFeedbackId("Correct!")
    } else if (Math.abs(parseInt(guessId) - pokemonData.pokedexEntry) < 5){
      setFeedbackId("Almost there!")
    } else if (Math.abs(parseInt(guessId) - pokemonData.pokedexEntry) < 20){
      setFeedbackId("You are a little off.")
    } else {
      setFeedbackId("Incorrect. You are far off.")
      setGuessId("")
    }
  }

  return (
    <div>
      {pokemonData && (
        <div>
          <img src={pokemonData.sprites} alt="Image of a pokemon" />
          <br />
          <input
            type="text"
            placeholder="Enter Pokémon Name"
            value={guessName}
            onChange={(e) => setGuessName(e.target.value)}
          />
          <button onClick={handleGuessName}>Submit Name</button>
          <p>{feedbackName}</p>
          <input
            type="number"
            placeholder="Enter Pokedex Entry"
            value={guessId}
            onChange={(e) => setGuessId(e.target.value)}
          />
          <button onClick={handleGuessId}>Submit Pokédex entry</button>
          <p>{feedbackId}</p>
          { notDone ? (
            <button onClick={handleNextPokemon}>Next Pokémon</button>
          ) : (
            <button onClick={handlePlayAgain}>Go to Start</button>
          )}
        </div>
      )}
    </div>
  )
}

export default GameView