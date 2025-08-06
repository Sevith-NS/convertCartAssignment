"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateSegmentHandler = void 0;
const segment_services_1 = require("../services/segment-services");
const evaluateSegmentHandler = async (req, res) => {
    try {
        const { rules } = req.body;
        if (!rules || typeof rules !== "string") {
            return res.status(400).json({ message: "Missing/invalid rules in request body" });
        }
        const result = await (0, segment_services_1.evaluateSegment)(rules);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ message: "Error evaluating segment", error: err });
    }
};
exports.evaluateSegmentHandler = evaluateSegmentHandler;
