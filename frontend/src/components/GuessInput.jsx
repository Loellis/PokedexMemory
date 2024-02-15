import React from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const GuessInput = ({ guessName, guessId, setGuessName, setGuessId, handleCheckAnswer, inputRef }) => {
  return (
    <div>
      <TextField 
        inputRef={inputRef}
        label="Enter Pokémon Name"
        autoFocus
        value={guessName}
        onChange={(e) => setGuessName(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Enter Pokedex Entry"
        type="number"
        value={guessId}
        onChange={(e) => setGuessId(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <Button
        variant="contained"
        onClick={() => handleCheckAnswer(guessName, guessId)}
        disabled={!guessName || !guessId }
      >
        Submit Answer
      </Button>
    </div>
  )
}

export default GuessInput