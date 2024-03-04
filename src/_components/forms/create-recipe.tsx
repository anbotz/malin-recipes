import recipe from "@/server/recipe";
import { Button, Container, TextField } from "@mui/material";

export const CreateRecipeForm = () => {
  const submit = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const ingredients = formData.get("ingredients") as string;
    const instructions = formData.get("instructions") as string;

    recipe.createRecipe(name, ingredients, instructions);
  };

  return (
    <form action={submit}>
      <Container
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          id="outlined-basic"
          label="Nom de la recette"
          variant="outlined"
          placeholder="Nom de la recette"
          name="name"
          margin="dense"
          required
          fullWidth
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Ingrédients"
          multiline
          maxRows={10}
          name="ingredients"
          margin="dense"
          required
          fullWidth
          minRows={4}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Instructions"
          multiline
          maxRows={10}
          name="instructions"
          margin="dense"
          fullWidth
          minRows={4}
        />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" type="submit">
          Ajouter
        </Button>
        <Button variant="contained">Retour</Button>
      </Container>
    </form>
  );
};
