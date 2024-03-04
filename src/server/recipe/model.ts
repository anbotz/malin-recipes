import { MongoId } from "./../../_types/query";
import Query from "@/_types/query";
import { db } from "@/lib/db";

const create = async (recipe: {
  name: string;
  ingredients: string[];
  instructions: string[];
}) =>
  await db.recipe.create({
    data: recipe,
  });

const search = async ({ from, size, search }: Query) =>
  await db.recipe.findMany({
    skip: from,
    take: size,
    ...(search ? { where: { name: search } } : {}),
  });

const getLatestRecipes = async () =>
  await db.recipe.findMany({
    orderBy: {
      id: "desc",
    },
    take: 5,
  });

const getById = async (id: MongoId) =>
  await db.recipe.findUnique({
    where: {
      id,
    },
  });

const RecipeModel = { create, search, getLatestRecipes, getById };

export default RecipeModel;
