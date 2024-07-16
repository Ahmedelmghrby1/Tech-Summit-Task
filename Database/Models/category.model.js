import { model, Schema, Types } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "name is required"],
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
  },
});

export const Category = model("Category", categorySchema);
