'use strict';

var Polls = require('../models/poll.js');
var uniqid = require('uniqid');

function pollHandler() {
    var noResults = {"results": "No polls found"};
    
    this.getAllPolls = function(req, res) {
        Polls.find({}, {_id: false}).select("pollName pollDisplayName pollCreatedBy").exec(function(err, data) {
            if (err) throw err;

                if (data.length===0) {
                    res.json(noResults);
                } else {
                    res.json(data);
                }
            
        });
    };
    
    this.getPollByName = function(req, res) {
        
        var query = Polls.findOne({'pollName': req.params.id}, {_id: false});
        query.exec(function(err, data) {
           if (err) throw err;
        
            if (data) {
                res.json(data);
            } else {
                res.json(noResults);
            }
        });
        
    };
    
    this.getUserPolls = function(req, res) {
        if (req.isAuthenticated()) {
            Polls.find({}, {_id: false})
                .where('pollCreatedBy')
                .equals(req.user.facebook.displayname)
                .exec(function(err, data) {
                    if (err) throw err;
                    if (data.length === 0) {
                        res.json(noResults);
                    } else {
                        res.json(data);
                    }
                });
        }
    };
    
    this.addVote = function(req, res) {
        
        if (req.body) {
            Polls.findOne({"pollName": req.body.pollName}).exec(function(err, data) {
               if (err) throw err;
               var choices = data.choices;
               choices.forEach(function(item) {
                  if (item.choiceTitle === req.body.question) {
                      item.choiceVotes += 1;
                  } 
               });
               data.save(function(err) {
                  if (err) throw err; 
               });
               //res.send(JSON.stringify(data));
               res.redirect("/poll/" + req.body.pollName + "/results");
            });
        } else {
            res.sendStatus(500).send("Something bad happened");
        }
        
    }
    
    this.deleteUserPoll = function(req, res) {
        if (req.isAuthenticated()) {
            Polls.remove({"pollName": req.params.id, "pollCreatedBy": req.user.facebook.displayname}).exec(function(err) {
                if (err) throw err;
                res.json({});
            })
        }
    }
    
    this.createPoll = function(req, res) {
        if (req.isAuthenticated()) {
           if (req.body) {
               var choices = req.body.choice;
               var cs = [];
               
               choices.forEach(function(item) {
                  cs.push({choiceTitle: item, choiceVotes: 0}); 
               });
               
               var newPoll = new Polls({
                   pollName: uniqid(),
                   pollDisplayName: req.body.pollDisplayName,
                   pollCreatedBy: req.user.facebook.displayname,
                   choices: cs
               });
            
               newPoll.save(function(err) {
                   if (err) throw err;
               });
               
               res.redirect("/myPolls");

           } else {
               res.sendStatus(500).send("Oops, couldn't create the new poll.");
           }
        }
    }
    
    this.addPollChoices = function(req, res) {
        var pollName = req.params.id || null;
        
        if (pollName) {
            
            var obj = req.body;
            var arrToUpdate = [];
            
            obj.forEach(function(item) {
               arrToUpdate.push({choiceTitle: item.choiceTitle, choiceVotes: item.choiceVotes}) ;
            });
            
           Polls.update({pollName: pollName}, {$pushAll: {choices: arrToUpdate}}).exec(function(err, results) {
                if (err) throw err;
                
                res.json(noResults);
            });
            
        }
        
        
    }
    
}

module.exports = pollHandler;