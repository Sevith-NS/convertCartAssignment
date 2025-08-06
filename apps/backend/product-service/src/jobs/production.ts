import cron from "node-cron";
import { fetchAndStoreProducts } from "../services/product-service";

// Runs every 30 minutes
cron.schedule("*/30 * * * *", async () => {
  console.log("Running scheduled product ingestion...");
  try {
    await fetchAndStoreProducts();
    console.log("Products ingested successfully.");
  } catch (err) {
    console.error("Ingestion failed:", err);
  }
});