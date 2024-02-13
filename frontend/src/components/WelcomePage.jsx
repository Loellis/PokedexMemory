import React from "react"

const WelcomePage = ({ onStartGame }) => {
  return (
    <div>
      <button onClick={onStartGame}>Start Game</button>
    </div>
  )
}

export default WelcomePage
