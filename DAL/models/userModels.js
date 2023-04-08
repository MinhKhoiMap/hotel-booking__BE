import mongoose from "mongoose";
import userSchema from "../schemas/userSchema";

class userModelClass {
  constructor() {
    this.model = mongoose.model("users", userSchema);
  }

  //   create a new user
  create(newProfile) {
    return this.model.create(newProfile);
  }

  //   Research
  getUserByEmail(email) {
    return this.model.find({ email: email });
  }

  getUserByPhoneNumber(phoneNumber) {
    return this.model.find({ phoneNumber: phoneNumber });
  }

  //   Update
  update(ID, newProfile) {
    return this.model.updateOne({ userID: ID }, newProfile);
  }

  //   Delete
  delete(ID) {
    return this.model.deleteOne({ userID: ID });
  }
}

export default userModelClass;
