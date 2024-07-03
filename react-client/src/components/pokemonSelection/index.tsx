import React from "react";
import { Box, Typography } from "@mui/material";
import PokemonSelectionCard from "../pokemonSelectionCard";
import { IPokemon } from "../../models/pokemon";
import { usePokemonBattleContext } from "../../context/pokemonBattleContext";

const PokemonSelection: React.FC = () => {
  const { pokemons, pokemonsSelected, setPokemonsSelected, setWinner } =
    usePokemonBattleContext();

  const onClickCard = (id: string) => {
    if (!pokemonsSelected.find((p) => p.id === id)) {
      const poke = pokemons.find((p) => p.id === id) as IPokemon;
      let selected = [...pokemonsSelected, poke];
      if (selected.length > 2) {
        selected = selected.slice(1);
      }

      setPokemonsSelected(selected);
      setWinner(null);
    }
  };

  return (
    <>
      <Typography variant="h5">Select your pokemon</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {pokemons?.map((pokemon) => (
          <PokemonSelectionCard
            key={pokemon.id}
            pokemon={pokemon}
            onCardSelection={onClickCard}
          />
        ))}
      </Box>
    </>
  );
};

export default PokemonSelection;
