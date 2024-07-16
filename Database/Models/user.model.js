import { Schema, model } from "mongoose";

// User Schema
const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
  }
  ,{
    timestamps:{createdAt:true},
    versionKey : false
    });
  
  export const User= model('User', userSchema);  