import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import userModelClass from "../DAL/models/userModels";

const userModel = new userModelClass();

const clientIDGoogle =
  "127974748175-ecskbh6i35tp3hl903dq65u85armt96p.apps.googleusercontent.com";
const clientSecretGoogle = "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";

passport.use(
  new Strategy(
    {
      clientID: clientIDGoogle,
      clientSecret: clientSecretGoogle,
      callbackURL: "/api/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile, "profile âyyyyyy");
        userModel
          .getUserByEmail(profile.emails[0].value)
          .then((data) => {
            console.log("Data", data, data.length);
            if (data.length > 0) done(null, { data: data[0], existed: true });
            else
              done(null, {
                profile: {
                  email: profile.emails[0].value,
                  avatar: profile.photos[0].value,
                },
                existed: false,
              });
          })
          .catch((err) => {
            console.log(err);
            done(err);
          });
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);
