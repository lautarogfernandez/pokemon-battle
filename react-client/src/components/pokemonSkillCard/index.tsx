import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import SkillBar from "../skillBar";
import { IPokemon } from "../../models/pokemon";

interface IPokemonSelectionCard {
  pokemon: IPokemon | undefined;
}

const PokemonSkillCard: React.FC<IPokemonSelectionCard> = ({ pokemon }) => {
  if (!pokemon) {
    return (
      <Card sx={{ maxWidth: 300 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            No pokemon selected
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia component="img" image={pokemon.imageUrl} alt={pokemon.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Divider />

        <SkillBar skill={"HP"} value={pokemon.hp} />
        <SkillBar skill={"Attack"} value={pokemon.attack} />
        <SkillBar skill={"Defense"} value={pokemon.defense} />
        <SkillBar skill={"Speed"} value={pokemon.speed} />
      </CardContent>
    </Card>
  );
};

export default PokemonSkillCard;
