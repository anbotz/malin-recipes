export type Query = {
  from: number;
  size: number;
  search: string | undefined;
};

export type MongoId = string;

export type ServiceResponse<T> = {
  data?: T;
  success?: string;
  error?: string;
};

export default Query;
