import { Router } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import bookingModelClass from "../DAL/models/bookingModels";

const bookingRoute = Router();
const bookingModel = new bookingModelClass();

bookingRoute.get("/:id", (req, res) => {
  const ID = req.params.id;

  bookingModel
    .getBookingByID(ID)
    .then((booking) => {
      res.status(StatusCodes.OK).json(booking);
    })
    .catch((err) => {
      throw err;
    });
});

bookingRoute.post("", (req, res) => {
  bookingModel
    .createBooking({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      IDRoom: req.body.IDRoom,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      adults: req.body.adults,
      childs: req.body.childs,
      totalMoney: req.body.totalMoney,
      roomsNumber: req.body.roomsNumber,
      status: req.body.status,
    })
    .then((response) => {
      console.log("booking", response);
      res
        .status(StatusCodes.OK)
        .json({ booking: response, message: "Đặt phòng thành công!" });
    })
    .catch((err) => {
      console.log(err, "o booking route");
      res
        .status(StatusCodes.SERVICE_UNAVAILABLE)
        .json({ message: "Failed to booking rooms" });
    });
});

export default bookingRoute;
