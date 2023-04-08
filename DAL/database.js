import mongoose from "mongoose";

const databaseURL = "mongodb://localhost:27017/hotelbooking";

class DatabaseClass {
  constructor() {}
  connect = async () => {
    await mongoose.connect(databaseURL);
  };
}

export default DatabaseClass;
