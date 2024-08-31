const { Router } = require("express");
const passport = require("passport");
const authRouter = new Router();
require("dotenv").config();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(process.env.CLIENT_ORIGIN_URL + "/researches");
  }
);

authRouter.get("/user/", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.json(null);
  }
});
authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.redirect(process.env.CLIENT_ORIGIN_URL + "/login");
  });
});

module.exports = { authRouter };
