import { createContext, useContext } from "react";
import { IPokemon } from "../models/pokemon";

interface IPokemonBattleContext {
  pokemons: IPokemon[];
  setPokemons: React.Dispatch<
    React.SetStateAction<IPokemonBattleContext["pokemons"]>
  >;

  pokemonsSelected: IPokemon[];
  setPokemonsSelected: React.Dispatch<
    React.SetStateAction<IPokemonBattleContext["pokemonsSelected"]>
  >;

  winner: string | null;
  setWinner: React.Dispatch<
    React.SetStateAction<IPokemonBattleContext["winner"]>
  >;
}

export const PokemonBattleContext = createContext<IPokemonBattleContext | null>(
  null
);

export function usePokemonBattleContext() {
  const context = useContext(PokemonBattleContext);
  if (!context) {
    throw new Error(
      "usePokemonBattleContext must be used within a PokemonBattleContextProvider"
    );
  }
  return context;
}
