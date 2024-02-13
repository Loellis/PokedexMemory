import React, { useState } from "react";
import GameView from "./GameView";

const WelcomePage = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div>
      <h1>Who's that Pokémon?!</h1>
      {!gameStarted ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <GameView />
      )}
    </div>
  );
};

export default WelcomePage;
