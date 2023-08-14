import mongoose from "mongoose";
import { IAge } from "../types/ageType";

const ageSchema = new mongoose.Schema<IAge>({
  age: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
})

export default mongoose.model<IAge>('Age', ageSchema);