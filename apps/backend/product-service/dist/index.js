"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const product_routes_1 = __importDefault(require("./routes/product-routes"));
const cors_1 = __importDefault(require("cors"));
require("./jobs/production");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/products", product_routes_1.default);
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
    console.error("MONGODB_URI is not defined in .env");
    process.exit(1);
}
mongoose_1.default.connect(process.env.MONGODB_URI, {
    dbName: "products" // db name explicitly passed to Mongoose
})
    .then(() => {
    console.log("Connected to DB:", mongoose_1.default.connection.name);
    app.listen(PORT, () => {
        console.log(`Product service running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
});
