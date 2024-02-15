import React from "react"
import Button from "@mui/material/Button"
import { Grid } from "@mui/material"
import "../assets/pokeball.css"

const WelcomePage = ({ onStartGame }) => {

  const chooseRandomBall = () => {
    const choice = Math.floor(Math.random() * 3) + 1

    if (choice === 1) {
      return "/images/pokeball.webp"
    } else if (choice === 2) {
      return "/images/greatball.webp"
    } else {
      return "/images/ultraball.webp"
    }
  }

  return (
    <Grid container justifyContent="center" alignItems="center" pt={2}>
      <Grid item xs={12} textAlign="center" pb={5}>
        <img src={chooseRandomBall()} alt="Pokeball" className="pokeball"/>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <img src="/images/startgame.png" alt="Start game image button" onClick={onStartGame} className="startGameButton"/>
        {/* <Button variant="contained" onClick={onStartGame}>Start Game</Button> */}
      </Grid>
    </Grid>
  )
}

export default WelcomePage
