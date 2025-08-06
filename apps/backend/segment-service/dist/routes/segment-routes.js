"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const segment_controller_1 = require("../controllers/segment-controller");
const router = express_1.default.Router();
router.post("/evaluate", segment_controller_1.evaluateSegmentHandler);
exports.default = router;
