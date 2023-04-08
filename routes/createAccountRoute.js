import { Router } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import userModelClass from "../DAL/models/userModels";
import checkIsExisted from "../middlewares/checkIsExisted";

const createAccountRoute = Router();
const userModel = new userModelClass();

createAccountRoute.post("", checkIsExisted, (req, res) => {
  userModel
    .create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      avatarURL: req.body.avatarURL,
    })
    .then((data) => {
      console.log("data flajsdflkajsf", data);
      try {
        const userToken = jwt.sign(
          {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
          },
          "hotelbooking",
          {
            expiresIn: "30 days",
          }
        );
        res.json({ message: "Create Account Success", userToken });
      } catch (err) {
        res.status(StatusCodes.BAD_GATEWAY).json({ message: err });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(StatusCodes.SERVICE_UNAVAILABLE)
        .json({ message: "Failed to create account" });
    });
});

export default createAccountRoute;
