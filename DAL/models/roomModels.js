import mongoose from "mongoose";
import roomSchema from "../schemas/roomSchema";

class roomModelClass {
  constructor() {
    this.model = mongoose.model("rooms", roomSchema);
  }

  getAllRooms() {
    return this.model.find();
  }

  getRoomByID(ID) {
    return this.model.find({
      _id: ID,
    });
  }
}

export default roomModelClass;
