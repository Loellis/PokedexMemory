import React from "react";
import WelcomePage from "./components/WelcomePage";

const App = () => {
  const startGame = () => {
    // Implement your logic to start the game
    console.log("Starting the game...");
  };

  return (
    <div>
      <WelcomePage onStartGame={startGame} />
    </div>
  );
};

export default App;