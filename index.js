import express from "express";
import cors from "cors";
import expressSession from "express-session";
import passport from "passport";
import DatabaseClass from "./DAL/database";
import loginRoute from "./routes/loginRoute";
import createAccountRoute from "./routes/createAccountRoute";
import roomsRoute from "./routes/roomRoute";
import bookingRoute from "./routes/bookingRoute";

const app = express();
const db = new DatabaseClass();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({ secret: "hotelbooking" }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  //   console.log("in serializeUser", user);
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  //   console.log("in deserializeUser", user);
  return done(null, user);
});

// DEFINE ROUTES
app.use("/api/auth", loginRoute);
app.use("/api/create-account", createAccountRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/booking", bookingRoute);

// Start the server
app.listen(3002, () => {
  console.log("App is listening");
  db.connect()
    .then(() => {
      console.log("Database is connected");
    })
    .catch((err) => {
      throw err;
    });
});
