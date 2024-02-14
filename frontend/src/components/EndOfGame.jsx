import React from "react";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";

const EndOfGame = ({ score, timeUsed }) => {
  return (
    <Card sx={{ margin: "auto", marginTop: "20px", width: "400px" }}>
      <CardContent>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h5" gutterBottom>
              Game Over!
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Your final score is: {score}</Typography>
            <Typography variant="body2">Time used: {timeUsed}</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => window.location.reload()}>
              Play Again
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EndOfGame;
