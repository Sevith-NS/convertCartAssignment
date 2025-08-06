"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndStoreProducts = void 0;
const axios_1 = __importDefault(require("axios"));
const product_model_1 = require("../models/product-model");
const baseURL = process.env.WC_BASE_URL;
const consumerKey = process.env.WC_KEY;
const consumerSecret = process.env.WC_SECRET;
const fetchAndStoreProducts = async () => {
    const url = `${baseURL}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
    try {
        const { data } = await axios_1.default.get(url);
        const operations = data.map((p) => {
            var _a, _b;
            const formattedProduct = {
                id: p.id,
                title: p.name,
                price: String(p.price),
                stock_status: p.stock_status,
                stock_quantity: (_a = p.stock_quantity) !== null && _a !== void 0 ? _a : null,
                category: ((_b = p.categories[0]) === null || _b === void 0 ? void 0 : _b.name) || "Uncategorized",
                tags: p.tags.map((t) => t.name),
                on_sale: p.on_sale,
                created_at: p.date_created,
            };
            return {
                updateOne: {
                    filter: { id: p.id },
                    update: { $set: formattedProduct },
                    upsert: true,
                },
            };
        });
        if (operations.length > 0) {
            await product_model_1.ProductModel.bulkWrite(operations);
            console.log(`Ingested ${operations.length} products (with upserts)`);
        }
        else {
            console.log("No products returned from WooCommerce");
        }
        return data;
    }
    catch (err) {
        console.error("Failed to fetch products:", err);
        throw new Error("Product ingestion failed");
    }
};
exports.fetchAndStoreProducts = fetchAndStoreProducts;
// .env debug
// console.log("BASE URL:", baseURL);
// console.log("KEY:", consumerKey);
// console.log("SECRET:", consumerSecret);
