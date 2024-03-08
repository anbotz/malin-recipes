import RecipeCard from "@/_components/recipe-card";
import { Grid } from "@mui/material";
import Recipe from "@/_types/recipe";

const RecipesGrid = async ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <Grid spacing={2} columns={5} container alignItems="center">
      {recipes.length > 0 ? (
        recipes.map((a) => (
          <Grid item key={a.id} xs={1}>
            <RecipeCard recipe={a} />
          </Grid>
        ))
      ) : (
        <>Aucune recette trouvée</>
      )}
    </Grid>
  );
};

export default RecipesGrid;
