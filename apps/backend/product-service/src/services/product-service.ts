import axios from "axios";
import { ProductModel } from "../models/product-model";

const baseURL = process.env.WC_BASE_URL;
const consumerKey = process.env.WC_KEY;
const consumerSecret = process.env.WC_SECRET;

export const fetchAndStoreProducts = async () => {
  const url = `${baseURL}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

  try {
    const { data } = await axios.get(url);

    const operations = data.map((p: any) => {
      const formattedProduct = {
        id: p.id,
        title: p.name,
        price: String(p.price),
        stock_status: p.stock_status,
        stock_quantity: p.stock_quantity ?? null,
        category: p.categories[0]?.name || "Uncategorized",
        tags: p.tags.map((t: any) => t.name),
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
      await ProductModel.bulkWrite(operations);
      console.log(`Ingested ${operations.length} products (with upserts)`);
    } else {
      console.log("No products returned from WooCommerce");
    }

    return data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    throw new Error("Product ingestion failed");
  }
};


// .env debug

// console.log("BASE URL:", baseURL);
// console.log("KEY:", consumerKey);
// console.log("SECRET:", consumerSecret);
