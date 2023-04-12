import mongoose from "mongoose";

const databaseURL =
  "mongodb+srv://minhkhoi:pmk21092003@minkoi.rjasnin.mongodb.net/hotelbooking?retryWrites=true&w=majority";

class DatabaseClass {
  constructor() {}
  connect = async () => {
    await mongoose.connect(databaseURL);
  };
}

export default DatabaseClass;
