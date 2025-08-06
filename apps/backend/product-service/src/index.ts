import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import productRoutes from "./routes/product-routes";
import cors from "cors"
import "./jobs/production"

const app = express();
app.use(express.json());
app.use(cors()); 
app.use("/products", productRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("MONGODB_URI is not defined in .env");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI!, {
    dbName: "products"  // db name explicitly passed to Mongoose
  })
  .then(() => {
    console.log("Connected to DB:", mongoose.connection.name);
    app.listen(PORT, () => {
      console.log(`Product service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
