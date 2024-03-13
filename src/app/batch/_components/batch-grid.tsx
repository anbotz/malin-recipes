import { Grid } from "@mui/material";
import BatchCard from "./batch-card";

const BatchGrid = ({ days, batch }: { days: string[]; batch: string[] }) => {
  return (
    <Grid spacing={2} columns={5} container alignItems="center" height="80%">
      {days.length > 0 &&
        days.map((a, index) => (
          <Grid item key={a} xs={1} height="100%">
            <BatchCard recipeId={batch[index]} day={a} recipeIndex={index} />
          </Grid>
        ))}
    </Grid>
  );
};

export default BatchGrid;
