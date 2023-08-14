import mongoose from "mongoose";
import { ICoverage } from "../types/coverageType";

const coverageSchema = new mongoose.Schema<ICoverage>({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: false
  },
  value_user_over30: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: true
  },
})

export default mongoose.model<ICoverage>('Coverage', coverageSchema);