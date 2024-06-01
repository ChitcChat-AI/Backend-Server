const {Router} = require('express');
const passport = require('passport');
const authRouter = new Router();

authRouter.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
authRouter.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
    res.status(200).send("Logged in successfully!");
});

authRouter.get('/logout', (req, res,next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.send('Logged out.');
    });
});

module.exports= {authRouter}