import React, { useEffect, useState, useRef } from "react"
import WelcomePage from "./components/WelcomePage"
import GameView from "./components/GameView"
import FeedbackModal from "./components/FeedbackModal"
import EndOfGame from "./components/EndOfGame"
import { fetchPokemonById } from "./services/pokemonService"
import { generateScrambledArrayOfPokemonIds } from "./utils/utils"
import Header from "./components/Header"
import { Grid } from "@mui/material"
import "./App.css"



const App = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [pokemonData, setPokemonData] = useState(null)
  const [pokemonIndexes, setPokemonIndexes] = useState([])
  const [score, setScore] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [endOfGame, setEndOfGame] = useState(false)
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

  const handleEndOfGame = () => {
    setEndOfGame(true)
    setGameStarted(false)
  }

  const handleFeedback = (feedback) => {
    setFeedback(feedback)
    setIsOpen(true)
  }

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "90vh"}}
      mt={2}
    >
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
      { !gameStarted && !endOfGame && <WelcomePage onStartGame={handleStartGame} /> }
      </Grid>
      <Grid item>
        { endOfGame && <EndOfGame score={score} timeUsed={elapsedTime} /> }
      </Grid>
      <Grid item>
        { gameStarted && 
          <GameView pokemonData={pokemonData} 
            morePokemon={pokemonIndexes.length}
            updateScore={handleScore}
            score={score}
            timer={elapsedTime}
            updateFeedback={handleFeedback}
            endTheGame={handleEndOfGame} 
          />
        }
      </Grid>
      {isOpen && (
        <FeedbackModal
          open={isOpen}
          feedback={feedback}
          onClose={() => {
            if (pokemonIndexes.length !== 0) {
              handleContinue()
              setIsOpen(false)
            } else {
              handleEndOfGame()
              setIsOpen(false)
            }
          }}
          onContinue={() => {
            if (pokemonIndexes.length !== 0) {
              handleContinue()
              setIsOpen(false)
            } else {
              handleEndOfGame()
              setIsOpen(false)
            }
          }}
        />
      )}
    </Grid>
  )
}

export default App