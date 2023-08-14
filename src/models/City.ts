import mongoose from "mongoose";
import { ICity } from "../types/cityType";

const citySchema = new mongoose.Schema<ICity>({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
})

export default mongoose.model<ICity>('City', citySchema);