import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import roomModelClass from "../DAL/models/roomModels";

const roomRoute = Router();
const roomModel = new roomModelClass();

roomRoute.get("", (req, res) => {
  console.log("first");
  roomModel
    .getAllRooms()
    .then((rooms) => {
      // console.log(rooms);
      res.status(StatusCodes.OK).json(rooms);
    })
    .catch((err) => {
      throw err;
    });
});

roomRoute.get("/:id", (req, res) => {
  const ID = req.params.id;

  roomModel
    .getRoomByID(ID)
    .then((room) => {
      res.status(StatusCodes.OK).json(room);
    })
    .catch((err) => {
      throw err;
    });
});

export default roomRoute;
