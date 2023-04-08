import userModelClass from "../DAL/models/userModels";
import { StatusCodes } from "http-status-codes";

const userModel = new userModelClass();

const checkIsExisted = async (req, res, next) => {
  let checkEmail = false,
    checkPhoneNumber = false;

  await userModel.getUserByEmail(req.body.email).then((data) => {
    // console.log(data, "checkIsExisted");
    if (data.length > 0) {
      checkEmail = true;
    }
  });

  await userModel.getUserByPhoneNumber(req.body.phoneNumber).then((data) => {
    if (data.length > 0) {
      checkPhoneNumber = true;
    }
  });

  if (!checkEmail && !checkPhoneNumber) {
    next();
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Account already exists" });
  }
};

export default checkIsExisted;
