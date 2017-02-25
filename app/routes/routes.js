'use strict';
var Polls = require('../models/poll.js');
var PollHandler = require('../controllers/pollHandler.server.js');

module.exports = function(app, passport) {
    
    var pollHandler = new PollHandler();
    
    app.route("/")  
        .get((req, res) => {
            //res.sendFile(process.cwd() + "/public/index.html"); 
            res.render("index")
        });
        
    app.route("/#_=_")  
        .get((req, res) => {
            res.sendFile(process.cwd() + "/public/index.html"); 
        });        
    

    app.route("/api/poll") 
        .get(pollHandler.getAllPolls)
        .post(pollHandler.addVote);
    
    app.route("/api/poll/:id")
        .get(pollHandler.getPollByName)
        .delete(pollHandler.deleteUserPoll);
        
    app.route("/api/user/")
        .get(pollHandler.getUserPolls);
        
    app.route("/api/poll/create")
        .post(pollHandler.createPoll);
        
    app.route("/api/:id")
        .get(function(req, res) {
            
           if (req.isAuthenticated()) {
               res.json(req.user.facebook);
           } else {
               res.json("Not Authenticated");
           }
        });        
        
    app.route("/auth/facebook")
        .get(passport.authenticate('facebook'));
        
    app.route("/auth/facebook/callback")
        .get(passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/login'}));
        
    app.route("/login")
        .get(function(req, res) {
            //res.sendFile(process.cwd() + "/public/login.html");
            res.render("login");
        })
        
    app.route("/logout")
        .get(function(req, res) {
           req.logout();
           res.redirect("/");
        });
        
    app.route("/poll.html")
        .get(function(req, res) {
           // res.sendFile(process.cwd() + "/public/poll.html");
           res.render("poll");
        });
        
    app.route("/myPolls")
        .get(function(req, res) {
           //res.sendFile(process.cwd() + "/public/mypolls.html"); 
           res.render("mypolls");
        });
        
    app.route("/create")
        .get(function(req, res) {
            if (req.isAuthenticated()) {
                //res.sendFile(process.cwd() + "/public/createPoll.html"); 
                res.render("createPoll");
            } else {
                res.redirect("/login");
            }
        });
        
    app.route("/polls") 
        .get(function(req, res) {
           // res.sendFile(process.cwd() + "/public/poll-list.html"); 
           res.render("poll-list");
        });
        
};