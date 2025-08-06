"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestProducts = exports.getAllProducts = void 0;
const product_model_1 = require("../models/product-model");
const product_service_1 = require("../services/product-service");
const getAllProducts = async (req, res) => {
    try {
        const products = await product_model_1.ProductModel.find();
        console.log("Fetched from DB:", products);
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
};
exports.getAllProducts = getAllProducts;
const ingestProducts = async (req, res) => {
    try {
        const products = await (0, product_service_1.fetchAndStoreProducts)();
        res.json({ message: "Ingested successfully", count: products.length });
    }
    catch (err) {
        res.status(500).json({ message: "Ingestion failed" });
    }
};
exports.ingestProducts = ingestProducts;
