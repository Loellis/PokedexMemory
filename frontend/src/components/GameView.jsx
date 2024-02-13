import React, { useState } from "react"
import axios from "axios"

const GameView = () => {
  const [pokemonId, setPokemonId] = useState(null)
  const [pokemonImage, setPokemonImage] = useState("")
  const [pokemonNameGuess, setPokemonNameGuess] = useState("")
  const [pokemonIdGuess, setPokemonIdGuess] = useState("")

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1
    try {
      const response = await axios.get(`http://localhost:3003/api/pokemon/${randomId}`)
      const pokemonData = response.data.data
      setPokemonId(pokemonData.pokedexEntry)
      setPokemonImage(pokemonData.sprites)
      console.log(pokemonId)
      console.log(pokemonImage)
    } catch (error) {
      console.error("Error fetching random Pokemon:", error)
    }
  }

  return (
    <div>
      <button onClick={fetchRandomPokemon}>Start Game</button>
      {pokemonId && (
        <div>
          <img src={pokemonImage} alt="Image of a pokemon" />
          <label>
            Guess the Pokémon's name:
              <input 
                type="text" 
                value={pokemonNameGuess}
                onChange={(e) => setPokemonNameGuess(e.target.value)}
              />
          </label>
          <label>
            Guess it's Pokédex entry:
              <input
                type="number"
                value={pokemonIdGuess}
                onChange={(e) => setPokemonIdGuess(e.target.value)}
              />
          </label>
        </div>
      )}
    </div>
  )
}

export default GameView