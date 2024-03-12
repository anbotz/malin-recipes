import RecipeCard from "@/_components/recipe-card";
import { Grid } from "@mui/material";
import Recipe from "@/types/recipe";

const RecipesGrid = async ({ recipes }: { recipes: Recipe[] }) => {
  // FIXME: Warning: Failed prop type: Invalid prop `children` supplied to `ForwardRef(Box)`, expected a ReactNode.
  if (recipes.length === 0) return <>Aucune recette trouvée</>;

  return (
    <Grid spacing={2} columns={5} container alignItems="center">
      {recipes.map((a) => (
        <Grid item key={a.id} xs={1}>
          <RecipeCard recipe={a} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipesGrid;
