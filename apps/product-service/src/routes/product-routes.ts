import express from "express";
import { getAllProducts, ingestProducts } from "../contollers/product-controller"


const router = express.Router();

router.get("/", getAllProducts);
router.post("/ingest", ingestProducts);

export default router;
