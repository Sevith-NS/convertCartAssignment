import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  id: number;
  title: string;
  price: string;
  stock_status: string;
  stock_quantity: number | null;
  category: string;
  tags: string[];
  on_sale: boolean;
  created_at: string;
}

const ProductSchema: Schema = new Schema<IProduct>({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  stock_status: { type: String, required: true },
  stock_quantity: { type: Number, default: null },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  on_sale: { type: Boolean, required: true },
  created_at: { type: String, required: true },
});

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

