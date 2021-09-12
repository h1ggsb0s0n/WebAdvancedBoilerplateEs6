import mongoose from "mongoose";

async function database() {
   await mongoose.connect("mongodb://localhost:27017/db");
   return mongoose
}

export default {
  database,
};
