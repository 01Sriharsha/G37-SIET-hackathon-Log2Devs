import mongoose from "mongoose";
import marketPrice from "../models/market.schema.js";
export const getMarketPrice = async (req, res) => {
  const { district } = req.query;

  console.log(district);

  try {
    if (!district) throw new Error("Failed to fetch ditricts");
    const marketRecords = await marketPrice.find({
      records: {
        $elemMatch: {
          district: { $regex: district, $options: "i" },
        },
      },
    });
    if (marketRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No records found for this district." });
    }
    res
      .status(200)
      .json({ message: `markets in ${district}`, data: marketRecords });
  } catch (err) {
    res
      .status(500)
      .json({ message: "failed to fetch the data", data: err.message });
  }
};
