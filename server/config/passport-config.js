const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new localStrategy({_usernameField: 'email'}, (username, password, done) => {
    User.findOne({email: username}, (err, user) => {
        if (err) return done(err);
        if (!user) return (null, false, {message: "email non registrata"});
        if (!user.verifyPassword(password)) return (null, false, {message: "password errata"});
        return done(null,user);
    })
}));








/*
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
    function (username, password, done) {
        User.findOne({email: username}, function (err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, {message: 'Incorrect username'});
            if (!user.isValid(password)) return done(null, false, {message: 'Incorrect password'});
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    return done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        return done(err, user);
    });
});*/