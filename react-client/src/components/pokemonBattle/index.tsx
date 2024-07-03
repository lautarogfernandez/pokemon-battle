import { Box, Container, Typography } from "@mui/material";
import PokemonSelection from "../pokemonSelection";
import BattleResult from "../battleResult";
import PokemonsToBattle from "../pokemonsToBattle";
import { useEffect } from "react";
import PokemonService from "../../services/pokemonService";
import { usePokemonBattleContext } from "../../context/pokemonBattleContext";

const pokemonService = new PokemonService();

export default function PokemonBattle() {
  const { setPokemons, winner, pokemons } = usePokemonBattleContext();

  useEffect(() => {
    pokemonService.getPokemon().then((response) => {
      setPokemons(response);
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

        <BattleResult winner={battleWinner}></BattleResult>

        <PokemonsToBattle />
      </Box>
    </Container>
  );
}
