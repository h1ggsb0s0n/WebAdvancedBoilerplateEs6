import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  lastIP: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: String,
    required: true,
  },
},{versionKey:false});

export default mongoose.model("Account", accountSchema);