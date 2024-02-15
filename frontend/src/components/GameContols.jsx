import React from "react"
import { Typography, Grid } from "@mui/material"
import { formatTimeString } from "../utils/utils"

const GameControls = ({ score, morePokemon, timer }) => {
  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center" mt={1}>
      {score > 0 && (
        <Grid item sm={12} textAlign="center">
          <Typography variant="body1" color="primary">SCORE: {score}</Typography>
        </Grid>
      )}
      <Grid item sm={12} textAlign="center">
        <Typography variant="body1">Number of Pokémon left: {morePokemon}</Typography>
      </Grid>
      <Grid item sm={12} textAlign="center">
        <Typography variant="body1">Time played: {formatTimeString(parseInt(timer))}</Typography>
      </Grid>
    </Grid>
  )
}

export default GameControls