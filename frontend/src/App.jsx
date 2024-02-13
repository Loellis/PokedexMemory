import React, { useState } from 'react'
import WelcomePage from './components/WelcomePage'
import GameView from './components/GameView'
import { fetchRandomPokemon } from "./services/pokemonService"

const App = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [pokemonData, setPokemonData] = useState(null)

  const handleStartGame = async () => {
    try {
      const pokeData = await fetchRandomPokemon()
      setPokemonData(pokeData)
      setGameStarted(true)
    } catch (error) {
      console.error("Error starting game:", error)
    }
  }

  const handleContinue = async () => {
    try {
      const pokeData = await fetchRandomPokemon()
      setPokemonData(pokeData)
    } catch (error) {
      console.error("Error fetching new Pokémon:", error)
    }
  }

  return (
    <div>
      <h1>Who's that Pokémon?!</h1>
      {!gameStarted ? (
        <WelcomePage onStartGame={handleStartGame} />
      ) : (
        <GameView pokemonData={pokemonData} onContinue={handleContinue} />
      )}
    </div>
  )
}

export default App