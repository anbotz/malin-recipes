import RecipeCard from "@/_components/recipe-card";
import { Grid } from "@mui/material";
import Recipe from "@/_types/recipe";

const RecipesGrid = async ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <Grid spacing={2} container alignItems="center" justifyContent="center">
      {recipes.length > 0 ? (
        recipes.map((a) => (
          <Grid item key={a.id}>
            <RecipeCard recipe={a} />
          </Grid>
        ))
      ) : (
        <>No recipe found</>
      )}
    </Grid>
  );
};

export default RecipesGrid;
