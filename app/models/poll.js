'use strict';

const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Choice = new Schema({
    choiceTitle: String,
    choiceVotes: Number
});

var Poll = new Schema({
   pollName: String,
   pollDisplayName: String,
   pollCreatedBy: String,
  
   choices: [Choice]
   
});

module.exports = mongoose.model('Poll', Poll);