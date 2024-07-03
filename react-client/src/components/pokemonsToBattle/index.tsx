import { Alert, Box, Button, Grid } from "@mui/material";
import PokemonSkillCard from "../pokemonSkillCard";
import { IPokemon } from "../../models/pokemon";
import PokemonService from "../../services/pokemonService";
import { usePokemonBattleContext } from "../../context/pokemonBattleContext";
import { useState } from "react";

const pokemonService = new PokemonService();

const PokemonsToBattle: React.FC = () => {
  const { pokemonsSelected, setWinner } = usePokemonBattleContext();
  const [showError, setShowError] = useState(false);

  const pokemon1 = pokemonsSelected[0] as IPokemon;
  const pokemon2 = pokemonsSelected[1] as IPokemon;

  const startBattle = () => {
    setShowError(false);
    pokemonService
      .getWinner(pokemon1.id, pokemon2.id)
      .then((winnerId) => {
        setWinner(winnerId);
      })
      .catch((error) => {
        setShowError(true);
      });
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      {showError ? (
        <Grid item xs={12} sm={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Alert variant="outlined" severity="warning">
              Error while getting the winner. Please, try again later.
            </Alert>
          </Box>
        </Grid>
      ) : null}
      <Grid item xs={12} sm={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <PokemonSkillCard pokemon={pokemon1} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            style={{ textTransform: "none" }}
            variant="contained"
            color="success"
            disabled={!(pokemon1 && pokemon2)}
            onClick={startBattle}
          >
            Start Battle
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <PokemonSkillCard pokemon={pokemon2} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default PokemonsToBattle;
