import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { userModel } from "../persistence/Mongo/models/users.model.js";
import config from "../config.js";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

const GITHUB_CLIENT_ID = config.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = config.GITHUB_CLIENT_SECRET;

//GitHub Strategy

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/githubCallback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const userEmail = await userModel.findOne({ email: profile._json.email });
      const userLogin = await userModel.findOne({ email: profile._json.login });
      if (!userEmail && !userLogin) {
        const newUser = {
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1] || " ",
          email: profile._json.email || profile._json.login,
          password: " ",
        };
        const userDB = await userModel.create(newUser);
        done(null, userDB);
      } else {
        if (userEmail) {
          done(null, userEmail);
        } else {
          done(null, userLogin);
        }
      }
    }
  )
);

//JWT Strategy

const cookieExtractor = (req) => {
  const token = req.cookies.token
  return token
}

passport.use(
  "jwt",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: config.JWT_SECRET,
    },
    async (jwt_payload, done) => {
      done(null, jwt_payload.user)
    }
  )
);
