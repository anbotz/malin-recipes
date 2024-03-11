import { MongoId } from "./../../_types/query";
import Query from "@/_types/query";
import { UpdatedRecipeData } from "@/_types/recipe";
import { db } from "@/lib/db";
import { Recipe } from "@prisma/client";
import { ObjectId } from "bson";

type RawRecipe = {
  _id: { $oid: ObjectId };
  name: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string | null;
  createdAt: { $date: Date };
  updatedAt: { $date: Date };
  qtCounter: number;
};

export const mockRecipe: Recipe = {
  id: "1",
  name: "mockRecipe",
  ingredients: ["toto", "45cs de titi"],
  instructions: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  imageUrl: "diner.png",
  qtCounter: 2,
};

const create = async (recipe: {
  name: string;
  ingredients: string[];
  instructions: string[];
  qtCounter: number;
}): Promise<Recipe> =>
  await db.recipe.create({
    data: recipe,
  });

const search = async ({
  from,
  size,
  search,
}: Query): Promise<{ data: Recipe[]; total: number }> => {
  const query = {
    ...(search ? { where: { name: { contains: search } } } : {}),
  };
  const [data, total] = await db.$transaction([
    db.recipe.findMany({ skip: from * size, take: size, ...query }),
    db.recipe.count({ where: query.where }),
  ]);

  return { data, total };
};

const batch = async (size: number): Promise<Recipe[]> => {
  const data = (await db.recipe.aggregateRaw({
    pipeline: [{ $sample: { size } }],
  })) as unknown as RawRecipe[];

  const recipes = data?.map((r) => {
    const { _id, ...rest } = r;
    const id = _id.$oid.toString();
    const createdAt = rest.createdAt.$date;
    const updatedAt = rest.updatedAt.$date;
    return { ...rest, id, createdAt, updatedAt };
  });

  return recipes;
};

const getLatestRecipes = async (): Promise<Recipe[]> =>
  await db.recipe.findMany({
    orderBy: {
      id: "desc",
    },
    take: 5,
  });

const getById = async (id: MongoId): Promise<Recipe | null> =>
  await db.recipe.findUnique({
    where: {
      id,
    },
  });

const deleteById = async (id: MongoId): Promise<Recipe> =>
  await db.recipe.delete({
    where: {
      id,
    },
  });

const updateById = async ({
  id,
  data,
}: {
  id: MongoId;
  data: UpdatedRecipeData;
}): Promise<Recipe> =>
  await db.recipe.update({
    where: {
      id,
    },
    data: {
      ...data,
      updatedAt: new Date(Date.now()),
    },
  });

const RecipeModel = {
  create,
  search,
  getLatestRecipes,
  getById,
  deleteById,
  updateById,
  batch,
};

// const RecipeModel = {
//   create: (recipe: {
//     name: string;
//     ingredients: string[];
//     instructions: string[];
//   }) => Promise.resolve(mockRecipe),
//   search: (q: Query) => Promise.resolve([mockRecipe]),
//   getLatestRecipes: () => Promise.resolve([mockRecipe]),
//   getById: (id: MongoId) => Promise.resolve(mockRecipe),
//   deleteById: (id: MongoId) => Promise.resolve(mockRecipe),
//   updateById: ({ id, data }: { id: MongoId; data: UpdatedRecipeData }) =>
//     Promise.resolve(mockRecipe),
// };

export default RecipeModel;
