import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  _id: [mongoose.Schema.Types.ObjectId],
  name: String,
  address: String,
  introduce: String,
  price: Number,
  rank: Number,
  conveniences: Object,
  thumbnails: Array,
});

export default roomSchema;
