import { Box, Typography } from "@mui/material";
import { CharacteristicItem } from "./types";

type ResultsProps = {
  geometricalCharacteristics?: Array<CharacteristicItem>,
}

const Results = ({ geometricalCharacteristics = [] }: ResultsProps) => {
  return (<Box>
    <Typography component="h3">Geometrical Characteristics:</Typography>
    {
      geometricalCharacteristics.map(({ name, value }) => (<Typography textAlign="left" component="p">{name}: {value}</Typography>))
    }
  </Box>)
};

export default Results;