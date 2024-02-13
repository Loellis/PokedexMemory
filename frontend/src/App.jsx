import React, { useEffect, useState } from "react"
import WelcomePage from "./components/WelcomePage"
import GameView from "./components/GameView"
import { fetchPokemonById } from "./services/pokemonService"

const generateScrambledArrayOfPokemonIds = () => {
  const pokedexEntries = Array.from({length: 5}, (_, index) => index +1)
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

  const handleContinue = async () => {
    try {
      console.log(pokemonIndexes.length)
      // // Check if there are no more indexes left
      // if (pokemonIndexes.length === 0) {
      //   console.log("No more Pokémon to guess!");
      //   return;
      // }

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
                  morePokemon={pokemonIndexes.length} />
      )}
    </div>
  )
}

export default App