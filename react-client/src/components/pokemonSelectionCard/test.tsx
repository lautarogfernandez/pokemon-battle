import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IPokemon } from "../../models/pokemon";
import PokemonSelectionCard from ".";
import "@testing-library/jest-dom";

const pokemonMock: IPokemon = {
  id: "1111",
  name: "Pikachu",
  attack: 55,
  defense: 40,
  hp: 35,
  speed: 90,
  type: "Electric",
  imageUrl: "https://example.com/pikachu.png",
};

describe("PokemonSelectionCard", () => {
  test("renders the Pokemon image", () => {
    render(
      <PokemonSelectionCard pokemon={pokemonMock} onCardSelection={jest.fn()} />
    );

    const imgElement = screen.getByAltText(pokemonMock.name);

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", pokemonMock.imageUrl);
  });

  test("calls onCardSelection when the card is clicked", () => {
    const mockOnCardSelection = jest.fn();
    render(
      <PokemonSelectionCard
        pokemon={pokemonMock}
        onCardSelection={mockOnCardSelection}
      />
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(mockOnCardSelection).toHaveBeenCalledWith(pokemonMock.id);
  });
});
