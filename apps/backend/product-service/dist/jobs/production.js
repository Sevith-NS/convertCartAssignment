"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const product_service_1 = require("../services/product-service");
// Runs every 30 minutes
node_cron_1.default.schedule("*/30 * * * *", async () => {
    console.log("Running scheduled product ingestion...");
    try {
        await (0, product_service_1.fetchAndStoreProducts)();
        console.log("Products ingested successfully.");
    }
    catch (err) {
        console.error("Ingestion failed:", err);
    }
});
