import React from "react"
import { formatTimeString } from "../utils/utils"

const GameControls = ({ score, morePokemon, timer }) => {
  return (
    <div>
      {score > 0 && <p>SCORE: {score}</p>}
      <p>Number of Pokémon left: {morePokemon}</p>
      <p>Time played: {formatTimeString(parseInt(timer))}</p>
    </div>
  )
}

export default GameControls