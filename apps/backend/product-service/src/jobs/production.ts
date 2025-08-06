import cron from "node-cron";
import { fetchAndStoreProducts } from "../services/product-service";

// Runs every minute
cron.schedule("*/1 * * * *", async () => {
  console.log("Running scheduled product ingestion...");
  try {
    await fetchAndStoreProducts();
    console.log("Products ingested successfully through CRON JOB.");
  } catch (err) {
    console.error("Ingestion failed:", err);
  }
});