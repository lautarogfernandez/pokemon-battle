import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";

interface ISkillBar {
  skill: string;
  value: number;
}

const SkillBar: React.FC<ISkillBar> = ({ skill, value }) => {
  return (
    <>
      <Typography variant="body2">{skill}</Typography>
      <LinearProgress
        variant="determinate"
        color="success"
        value={value * 10}
      />
    </>
  );
};

export default SkillBar;
