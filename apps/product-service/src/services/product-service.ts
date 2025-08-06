import axios from "axios";
import { ProductModel } from "../models/product-model"

const baseURL = process.env.WC_BASE_URL;
const consumerKey = process.env.WC_KEY;
const consumerSecret = process.env.WC_SECRET;

export const fetchAndStoreProducts = async () => {
  const url = `${baseURL}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

  try {
    const { data } = await axios.get(url);

    const formatted = data.map((p: any) => ({
      id: p.id,
      title: p.name,
      price: String(p.price),
      stock_status: p.stock_status,
      stock_quantity: p.stock_quantity ?? null,
      category: p.categories[0]?.name || "Uncategorized",
      tags: p.tags.map((t: any) => t.name),
      on_sale: p.on_sale,
      created_at: p.date_created,
    }));

    // await ProductModel.deleteMany({}); //  Clean database before inserting
    await ProductModel.insertMany(formatted);

    return formatted;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    throw new Error("Product insertion failed");
  }
};

// .env debug

// console.log("BASE URL:", baseURL);
// console.log("KEY:", consumerKey);
// console.log("SECRET:", consumerSecret);
