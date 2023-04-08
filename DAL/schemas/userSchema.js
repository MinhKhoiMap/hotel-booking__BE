import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  password: String,
  email: String,
  name: String,
  birthDay: Date,
  phoneNumber: String,
  avatarURL: String,
});

export default userSchema;
