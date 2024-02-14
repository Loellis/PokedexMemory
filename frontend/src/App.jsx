import React, { useEffect, useState, useRef } from "react"
import WelcomePage from "./components/WelcomePage"
import GameView from "./components/GameView"
import { fetchPokemonById } from "./services/pokemonService"

const generateScrambledArrayOfPokemonIds = () => {
  const pokedexEntries = Array.from({length: 151}, (_, index) => index +1)
  for (let i = pokedexEntries.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = pokedexEntries[i]
    pokedexEntries[i] = pokedexEntries[j]
    pokedexEntries[j] = temp
  }
  return pokedexEntries
}

const App = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [pokemonData, setPokemonData] = useState(null)
  const [pokemonIndexes, setPokemonIndexes] = useState([])
  const [score, setScore] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const timeRef = useRef(null)

  useEffect(() => {
    if (gameStarted) {
      timeRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(timeRef.current)
    }

    return () => clearInterval(timeRef.current)
  }, [gameStarted])

  useEffect(() => {
    setPokemonIndexes(generateScrambledArrayOfPokemonIds())
  }, [gameStarted])

  const handleStartGame = async () => {
    try {
      setGameStarted(true)
      const pokeData = await fetchPokemonById(pokemonIndexes[0])
      setPokemonData(pokeData)
      setPokemonIndexes(pokemonIndexes.slice(1))
    } catch (error) {
      console.error("Error starting game:", error)
    }
  }

  const handleScore = (points) => {
    setScore(score + points)
  }

  const handleContinue = async () => {
    try {
      const pokeData = await fetchPokemonById(pokemonIndexes[0])
      setPokemonData(pokeData)
      setPokemonIndexes(pokemonIndexes.slice(1))
    } catch (error) {
      console.error("Error fetching new Pokémon:", error)
    }
  }

  const handlePlayAgain = async () => {
    const newIndexes = generateScrambledArrayOfPokemonIds()
    setPokemonIndexes(newIndexes)
    setGameStarted(false)
  }

  return (
    <div>
      <h1>Who's that Pokémon?!</h1>
      {!gameStarted ? (
        <WelcomePage onStartGame={handleStartGame} />
      ) : (
        <GameView pokemonData={pokemonData} 
                  onContinue={handleContinue} 
                  onPlayAgain={handlePlayAgain}
                  morePokemon={pokemonIndexes.length}
                  updateScore={handleScore}
                  score={score}
                  timer={elapsedTime} />
      )}
    </div>
  )
}

export default App