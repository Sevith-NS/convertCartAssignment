"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateSegment = void 0;
const product_model_1 = require("../models/product-model");
const rule_parser_1 = require("../utils/rule-parser");
const evaluateSegment = async (rulesText) => {
    const query = (0, rule_parser_1.parseRulesToMongoQuery)(rulesText);
    return product_model_1.ProductModel.find(query);
};
exports.evaluateSegment = evaluateSegment;
