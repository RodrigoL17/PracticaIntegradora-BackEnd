import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { userModel } from "../dao/models/users.model.js";
import { hashPassword } from "../utils.js";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

const GITHUB_CLIENT_ID = "Iv1.c2bec9897c1c6f40";
const GITHUB_CLIENT_SECRET = "1df42faef1060170ba908ab40eaa6bb5a3d41de5";

//GitHub Strategy

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/github",
    },
    async (accessToken, refreshToken, profile, done) => {
      const userEmail = await userModel.findOne({ email: profile._json.email });
      const userLogin = await userModel.findOne({ email: profile._json.login });
      if (!userEmail && !userLogin ) {
        const newUser = {
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1] || " ",
          email: profile._json.email || profile._json.login,
          password: " ",
        };
        const userDB = await userModel.create(newUser);
        done(null, userDB);
      } else {
        if(userEmail){
            done(null, userEmail)
        }else{done(null, userLogin) };
      }
    }
  )
);
