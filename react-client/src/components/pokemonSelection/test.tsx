import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IPokemon } from "../../models/pokemon";
import PokemonSelection from ".";
import {
  IPokemonBattleContext,
  PokemonBattleContext,
} from "../../context/pokemonBattleContext";
import "@testing-library/jest-dom";

const pikachu: IPokemon = {
  id: "1",
  name: "Pikachu",
  attack: 55,
  defense: 40,
  hp: 35,
  speed: 90,
  type: "Electric",
  imageUrl: "https://example.com/pikachu.png",
};
const charmander: IPokemon = {
  id: "2",
  name: "Charmander",
  attack: 52,
  defense: 43,
  hp: 39,
  speed: 65,
  type: "Fire",
  imageUrl: "https://example.com/charmander.png",
};
const squirtle: IPokemon = {
  id: "3",
  name: "Squirtle",
  attack: 48,
  defense: 65,
  hp: 44,
  speed: 43,
  type: "Water",
  imageUrl: "https://example.com/squirtle.png",
};
const mockPokemons: IPokemon[] = [pikachu, charmander, squirtle];

const setPokemonsSelectedMock = jest.fn();
const setWinnerMock = jest.fn();

const mockContextValue: IPokemonBattleContext = {
  pokemons: mockPokemons,
  setPokemons: jest.fn(),
  pokemonsSelected: [],
  setPokemonsSelected: setPokemonsSelectedMock,
  winner: null,
  setWinner: setWinnerMock,
};

afterEach(() => {
  setPokemonsSelectedMock.mockClear();
  setWinnerMock.mockClear();
  mockContextValue.pokemonsSelected = [];
  jest.clearAllMocks();
});

const renderComponent = (mockContextValue: IPokemonBattleContext) => {
  return render(
    <PokemonBattleContext.Provider value={mockContextValue}>
      <PokemonSelection />
    </PokemonBattleContext.Provider>
  );
};

describe("PokemonSelection", () => {
  test("renders the component", () => {
    renderComponent(mockContextValue);

    const titleElement = screen.getByText(/Select your pokemon/i);

    expect(titleElement).toBeInTheDocument();
  });

  test("renders all Pokemon cards", () => {
    renderComponent(mockContextValue);

    const pokemonCards = screen.getAllByRole("button");

    expect(pokemonCards).toHaveLength(mockPokemons.length);
  });

  test("calls onClickCard when a card is clicked", () => {
    renderComponent(mockContextValue);

    const pokemonCard = screen.getByAltText(pikachu.name);
    fireEvent.click(pokemonCard);

    expect(mockContextValue.setPokemonsSelected).toHaveBeenCalled();
    expect(mockContextValue.setWinner).toHaveBeenCalledWith(null);
  });

  test("does not select the same Pokemon more than once", () => {
    const contextValueMock = { ...mockContextValue };
    contextValueMock.pokemonsSelected = [pikachu];
    renderComponent(contextValueMock);

    const pokemonCard = screen.getByAltText(pikachu.name);
    fireEvent.click(pokemonCard);

    expect(contextValueMock.setPokemonsSelected).toHaveBeenCalledTimes(0);
  });

  test("selects a maximum of two Pokemon", () => {
    const contextValueMock = { ...mockContextValue };
    contextValueMock.pokemonsSelected = [pikachu, charmander];

    renderComponent(contextValueMock);

    const squirtleCard = screen.getByAltText(squirtle.name);

    fireEvent.click(squirtleCard);

    expect(contextValueMock.setPokemonsSelected).toHaveBeenCalledTimes(1);
    expect(contextValueMock.setPokemonsSelected).toHaveBeenLastCalledWith([
      charmander,
      squirtle,
    ]);
  });
});
