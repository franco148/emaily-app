const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// https://console.developers.google.com/
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // console.log('access token', accessToken);
    // console.log('refresh token', refreshToken);
    // console.log('profile', profile);
    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if (!existingUser) {
                console.log('Go to save the user got from Google Account...');
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
            } else {
                console.log('User is already registered...');
                // done receives the error as a first argument
                done(null, existingUser);
            }
        });

}));