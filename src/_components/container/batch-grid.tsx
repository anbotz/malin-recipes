import { Box, Container, Grid } from "@mui/material";
import BatchCard from "../batch-card";
import { mockRecipe } from "@/server/recipe/model";

const BatchGrid = ({ days }: { days: string[] }) => {
  return (
    <Grid spacing={2} columns={5} container alignItems="center" height="80%">
      {days.length > 0 &&
        days.map((a) => (
          <Grid item key={a} xs={1} height="100%">
            <BatchCard recipe={mockRecipe} day={a} />
          </Grid>
        ))}
    </Grid>
  );
};

export default BatchGrid;
