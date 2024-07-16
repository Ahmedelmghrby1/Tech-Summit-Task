import { model, Schema, Types } from "mongoose";

const schema = new Schema({
  textTask: {
    type: String,
    required: true,
  },
  listTask: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ["private", "public"],
    default: "private",
  },
  category: {
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false
});

export const Task = model('Task', schema);
