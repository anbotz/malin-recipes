import { MongoId } from "../types/query";
import Query from "@/types/query";
import { UpdatedRecipeData } from "@/types/recipe";
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
  batchIds: string[];
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

const getManyRandom = async (size: number): Promise<Recipe[]> => {
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

const getManyRecipeByIds = async (ids: MongoId[]) =>
  await db.recipe.findMany({
    where: {
      id: { in: ids },
    },
  });

const RecipeModel = {
  create,
  search,
  getLatestRecipes,
  getById,
  deleteById,
  updateById,
  getManyRandom,
  getManyRecipeByIds,
};

export default RecipeModel;
