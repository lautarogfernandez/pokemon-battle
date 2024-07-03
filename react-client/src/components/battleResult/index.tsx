import { Card, Container, Typography } from "@mui/material";
import { IPokemon } from "../../models/pokemon";
import { blue } from "@mui/material/colors";

interface IBattleResult {
  winner?: IPokemon;
}

const BattleResult: React.FC<IBattleResult> = ({ winner }) => {
  if (!winner) {
    return <Container />;
  }

  return (
    <Card
      variant="outlined"
      sx={{
        textAlign: "center",
        backgroundColor: `${blue[50]}`,
        borderColor: "black",
        borderWidth: "2px",
      }}
    >
      <Typography variant="h6">{winner.name} wins!</Typography>
    </Card>
  );
};

export default BattleResult;
