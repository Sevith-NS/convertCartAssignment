"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const segment_routes_1 = __importDefault(require("./routes/segment-routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/segments", segment_routes_1.default);
const PORT = process.env.PORT || 5001;
mongoose_1.default.connect(process.env.MONGODB_URI, { dbName: "products" })
    .then(() => {
    console.log("Segment service connected to DB");
    app.listen(PORT, () => {
        console.log(`Segment service running on port ${PORT}`);
    });
})
    .catch(err => console.error("MongoDB connection error", err));
