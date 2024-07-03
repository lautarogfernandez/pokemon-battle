import { useState } from "react";
import { PokemonBattleContext } from "./context/pokemonBattleContext";
import { IPokemon } from "./models/pokemon";
import PokemonBattle from "./components/pokemonBattle";

function App() {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [pokemonsSelected, setPokemonsSelected] = useState<IPokemon[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  return (
    <PokemonBattleContext.Provider
      value={{
        pokemons,
        setPokemons,
        pokemonsSelected,
        setPokemonsSelected,
        winner,
        setWinner,
      }}
    >
      <PokemonBattle />
    </PokemonBattleContext.Provider>
  );
}

export default App;
