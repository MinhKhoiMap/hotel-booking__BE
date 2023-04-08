import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  address: String,
  IDRoom: String,
  checkIn: String,
  checkOut: String,
  adults: Number,
  childs: Number,
  totalMoney: Number,
  roomsNumber: Number,
  status: String,
});

export default bookingSchema;
