import React, { useState, useEffect } from "react"

const GameView = ({ 
    pokemonData, 
    onContinue, 
    onPlayAgain, 
    morePokemon, 
    updateScore,
    score,
    timer }) => {
  const [guessName, setGuessName] = useState("")
  const [guessId, setGuessId] = useState("")
  const [notDone, setNotDone] = useState(true)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)


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
    setGuessId("")
    setFeedback("")
    setSubmitted(false)
  }

  const handlePlayAgain = () => {
    onPlayAgain()
    setGuessName("")
    setGuessId("")
    setFeedback("")
    setSubmitted(false)
  }

  useEffect(() => {
    setNotDone(morePokemon !== 0)
  }, [morePokemon])


  const handleCheckAnswer = (name, index) => {
    if (name.toLowerCase() === pokemonData.name.toLowerCase() && parseInt(index) === pokemonData.pokedexEntry) {
      updateScore(2)
      setFeedback("You guessed both Pokédex entry and the name correctly!")
    } else if (name.toLowerCase() === pokemonData.name.toLowerCase() && parseInt(index) !== pokemonData.pokedexEntry) {
      updateScore(1)
      setFeedback(`You guessed the name correctly, but the Pokédex entry was wrong. Your guess: ${index}. Correct Answer: ${pokemonData.pokedexEntry}`)
    } else if (name.toLowerCase() !== pokemonData.name.toLowerCase() && parseInt(index) === pokemonData.pokedexEntry) {
      if (isGuessCloseEnough(name, pokemonData.name)) {
        updateScore(2)
        setFeedback(`Your name guess was close enough! You misspelled ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}. The Pokédex entry was correctly guessed.`)
      } else {
        updateScore(1)
        setFeedback(`You guessed the wrong name, but the Pokédex entry was correct. Your guess: ${name}. Correct answer: ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}`)
      }
    } else {
      if (isGuessCloseEnough(name, pokemonData.name)) {
        setFeedback(`Your name guess was close enough! You misspelled ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}. The Pokédex entry was incorrect. Your Pokédex guess: ${index}. Correct answer: ${pokemonData.pokedexEntry}`)
        updateScore(1)
      } else {
        setFeedback("Both your guesses were wrong.")
      }
    }

    setSubmitted(true)
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
            disabled={!guessName || !guessId || submitted}
          >
            Submit Answer
          </button>
          <p>{feedback}</p>
          <p>Number of Pokémon left: {morePokemon}</p>
          <p>Seconds played: {timer}</p>
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