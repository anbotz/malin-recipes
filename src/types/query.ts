export type Query = {
  from: number;
  size: number;
  search: string | undefined;
};

export type MongoId = string;

export default Query;
