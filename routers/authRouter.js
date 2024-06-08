const {Router} = require('express');
const passport = require('passport');
const authRouter = new Router();

authRouter.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
authRouter.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
        res.redirect('http://localhost:3002/researches');
    });

authRouter.get('/user/', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.json(null);
    }
});
authRouter.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.send('Logged out.');
    });
});

module.exports = {authRouter}