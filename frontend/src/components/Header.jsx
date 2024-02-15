import React from "react";
import { Grid } from "@mui/material"

const Header = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item maxWidth="100%">
        <img src="/images/whosthatpokemonimage.png" alt="Image of a the text who's that pokemon in the pokemon font" />
      </Grid>
    </Grid>
  )
}

export default Header