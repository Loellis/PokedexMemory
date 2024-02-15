import React from "react"
import Button from "@mui/material/Button"

const WelcomePage = ({ onStartGame }) => {
  return (
    <div>
      <Button variant="contained" onClick={onStartGame}>Start Game</Button>
    </div>
  )
}

export default WelcomePage
