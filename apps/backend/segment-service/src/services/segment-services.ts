import { ProductModel } from "../models/product-model";
import { parseRulesToMongoQuery } from "../utils/rule-parser";

export const evaluateSegment = async (rulesText: string) => {
  const query = parseRulesToMongoQuery(rulesText);
  return ProductModel.find(query);
};
