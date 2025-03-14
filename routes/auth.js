const express = require('express');
const passport = require('passport');

const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const {join,login,logout} = require('../controllers/auth');

const router = express.Router();

//POST /auth/join
router.post('/join',isNotLoggedIn, join);

//POST /auth/login
router.post('/login', isNotLoggedIn, login);

//GET /auth/logout
router.get('/logout', isLoggedIn, logout);

//GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

//GET /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?loginError=kakao login failed',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;