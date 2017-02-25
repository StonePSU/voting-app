'use strict';

var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/users.js');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
       done(null, user.id); 
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APPID,
        clientSecret: process.env.FACEBOOK_APPSECRET,
        callbackURL: process.env.APP_URL + 'auth/facebook/callback'
    }, 
    function( accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
         User.findOne({'facebook.id': profile.id}, function(err, user) {
             
               if (err) return done(err);
               
               if (user) {
                   return done(null, user);
               } else {
                   var newUser = new User();
                   
                   newUser.facebook.id = profile.id;
                   newUser.facebook.username = profile.username;
                   newUser.facebook.displayname = profile.displayName;
                   
                   newUser.save(function(err) {
                       if (err) throw err;
                       
                       return done(null, newUser);
                   })
               }
            });
        });
    }))
};