import mongoose from "mongoose";
import bookingSchema from "../schemas/bookingSchema";

class bookingModelClass {
  constructor() {
    this.model = mongoose.model("bookings", bookingSchema);
  }

  getBookingByID(id) {
    return this.model.find({
      _id: id,
    });
  }

  createBooking(booking) {
    return this.model.create(booking);
  }
}

export default bookingModelClass;
