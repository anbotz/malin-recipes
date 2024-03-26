import { MongoId } from "../types/query";
import Query from "@/types/query";
import { UpdatedRecipeData } from "@/types/recipe";
import { db } from "@/lib/db";
import { Health, IngredientLine, Recipe } from "@prisma/client";
import { ObjectId } from "bson";

type RawRecipe = Recipe & {
  _id: { $oid: ObjectId };
  createdAt: { $date: Date };
  updatedAt: { $date: Date };
};

const create = async (recipe: {
  name: string;
  ingredients: string[];
  instructions: string[];
  ingredientLines: IngredientLine[];
  qtCounter: number;
  health: Health[];
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

const getManyRandom = async (
  size: number,
  excludeIds?: string[]
): Promise<Recipe[]> => {
  const pipeline = [];

  if (excludeIds && excludeIds.length > 0) {
    const excludeObjectIds = excludeIds.map((id) => ({ $oid: id }));

    pipeline.push({
      $match: {
        _id: { $nin: excludeObjectIds },
      },
    });
  }

  pipeline.push({ $sample: { size } });

  const data = (await db.recipe.aggregateRaw({
    pipeline,
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
    take: 4,
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
