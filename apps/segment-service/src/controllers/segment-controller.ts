import { Request, Response } from "express";
import { evaluateSegment } from "../services/segment-services";

export const evaluateSegmentHandler = async (req: Request, res: Response) => {
  try {
    const { rules } = req.body;

    if (!rules || typeof rules !== "string") {
      return res.status(400).json({ message: "Missing/invalid rules in request body" });
    }

    const result = await evaluateSegment(rules);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error evaluating segment", error: err });
  }
};
