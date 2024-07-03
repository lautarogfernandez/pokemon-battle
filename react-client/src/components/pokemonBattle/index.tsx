import { Box, Container, Typography, Alert } from "@mui/material";
import PokemonSelection from "../pokemonSelection";
import BattleResult from "../battleResult";
import PokemonsToBattle from "../pokemonsToBattle";
import { useEffect, useState } from "react";
import PokemonService from "../../services/pokemonService";
import { usePokemonBattleContext } from "../../context/pokemonBattleContext";

const pokemonService = new PokemonService();

export default function PokemonBattle() {
  const { setPokemons, winner, pokemons } = usePokemonBattleContext();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    pokemonService
      .getPokemon()
      .then((response) => {
        setPokemons(response);
      })
      .catch((error) => {
        setShowError(true);
      });
  }, [setPokemons]);

  const battleWinner = pokemons.find((p) => p.id === winner);

  return (
    <Container
      id="pokemonBattle"
      sx={{
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "left",
          gap: "20px",
        }}
      >
        <Typography variant="h3">Battle of Pokemon</Typography>

        <PokemonSelection />
        {showError ? (
          <Alert variant="outlined" severity="error">
            Error when retreiving pokemon data.
          </Alert>
        ) : null}

        <BattleResult winner={battleWinner}></BattleResult>

        <PokemonsToBattle />
      </Box>
    </Container>
  );
}
