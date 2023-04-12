import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import "../middlewares/passport";
import userModelClass from "../DAL/models/userModels";

const redirectURL = "https://hotelbooking-nhom2.netlify.app";

const loginRoute = Router();
const userModel = new userModelClass();

loginRoute.get("", (req, res) => {
  const token = req.headers.authorization;
  let payload = jwt.verify(token, "hotelbooking");

  console.log("wtf is that");

  userModel
    .getUserByEmail(payload.email)
    .then((data) => {
      console.log(data, "loginRoute line:19");
      if (data.length > 0) res.status(StatusCodes.OK).json(data);
      else {
        res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err, "lỗi ở login route define");
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Server has errors" });
    });
});

loginRoute.post("/email", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, "email in login route");

  userModel.getUserByEmail(email).then((user) => {
    console.log(user[0], "email in user route");
    if (user.length > 0) {
      if (user[0].password === password) {
        const token = jwt.sign(
          {
            name: user[0].name,
            email: user[0].email,
            phoneNumber: user[0].phoneNumber,
          },
          "hotelbooking",
          { expiresIn: "30 days" }
        );
        res.status(StatusCodes.OK).json({ user, userToken: token });
      } else {
        res.status(StatusCodes.FORBIDDEN).json({ message: "Sai mật khẩu" });
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Tài khoản không tồn tại hoặc sai thông tin đăng nhập",
      });
    }
  });
});

loginRoute.post("/phone", (req, res) => {
  const phone = req.body.phoneNumber;
  const password = req.body.password;
  console.log(phone, "phone in login route");

  userModel.getUserByPhoneNumber(phone).then((user) => {
    console.log(user[0], "phone in user route");
    if (user.length > 0) {
      if (user[0].password === password) {
        const token = jwt.sign(
          {
            name: user[0].name,
            email: user[0].email,
            phoneNumber: user[0].phoneNumber,
          },
          "hotelbooking",
          { expiresIn: "30 days" }
        );
        res.status(StatusCodes.OK).json({ user, userToken: token });
      } else {
        res.status(StatusCodes.FORBIDDEN).json({ message: "Sai mật khẩu" });
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Tài khoản không tồn tại hoặc sai thông tin đăng nhập",
      });
    }
  });
});

loginRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

loginRoute.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    console.log("req.user kkkkrs", req.user);
    if (req.user.existed) {
      console.log(req.user, "user ở route login already");
      const token = jwt.sign(
        {
          name: req.user.data.name,
          email: req.user.data.email,
          phoneNumber: req.user.data.phoneNumber,
        },
        "hotelbooking",
        { expiresIn: "30 days" }
      );
      console.log("token nay ong gia", token);
      res.redirect(`${redirectURL}${domain && "/" + domain}?token=${token}`);
    } else {
      res.redirect(
        `${redirectURL}${domain && "/" + domain}/accounts/sign-up?email=${
          req.user.profile.email
        }&avatar=${req.user.profile.avatar}`
      );
    }
  }
);

export default loginRoute;
