import { Request, Response } from "express";
import { ProductModel } from "../models/product-model";
import { fetchAndStoreProducts } from "../services/product-service";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await ProductModel.find();
      console.log("Fetched from DB:", products);
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  };
  
  export const ingestProducts = async (req: Request, res: Response) => {
    try {
      const products = await fetchAndStoreProducts();
      res.json({ message: "Ingested successfully", count: products.length });
    } catch (err) {
      res.status(500).json({ message: "Ingestion failed" });
    }
  };


