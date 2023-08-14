import mongoose from "mongoose";
import { IDiscount } from "../types/discoutntType";

const discountSchema = new mongoose.Schema<IDiscount>({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
})

export default mongoose.model<IDiscount>('Discount', discountSchema);