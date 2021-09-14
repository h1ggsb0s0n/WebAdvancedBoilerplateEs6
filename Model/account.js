import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

accountSchema.pre("save", async function (next) {
  const user = this;

  try {
    if (!user.isModified("password")) next();

    let hash = await bcrypt.hash(user.password, 13);
    user.password = hash;

    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

accountSchema.methods.comparePassword = async function (password) {
  try {
    let result = await bcrypt.compare(password, this.password);

    return result;
  } catch (e) {
    console.error(e);

    return false;
  }
};




export default mongoose.model("Account", accountSchema);