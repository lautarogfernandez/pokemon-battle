import { ButtonBase, Card, CardMedia } from "@mui/material";
import { IPokemon } from "../../models/pokemon";

interface IPokemonSelectionCard {
  pokemon: IPokemon;
  onCardSelection: (id: string) => void;
}

const PokemonSelectionCard: React.FC<IPokemonSelectionCard> = ({
  pokemon,
  onCardSelection,
}) => {
  return (
    <Card key={pokemon.id} sx={{ maxWidth: 200 }}>
      <ButtonBase onClick={() => onCardSelection(pokemon.id)}>
        <CardMedia
          component="img"
          image={pokemon.imageUrl}
          alt={pokemon.name}
        />
      </ButtonBase>
    </Card>
  );
};

export default PokemonSelectionCard;
