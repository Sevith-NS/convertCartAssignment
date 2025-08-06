import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes/segment-routes";

const app = express();
app.use(express.json());

app.use("/segments", router);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URI!, { dbName: "products" })
  .then(() => {
    console.log("Segment service connected to DB");
    app.listen(PORT, () => {
      console.log(`Segment service running on port ${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error", err));
