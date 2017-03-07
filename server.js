'use strict';

const express = require('express'), 
    mongoose = require('mongoose'), 
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser');
const routes = require('./app/routes/routes.js');
var app = express();
require('dotenv').config();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

app.use("/public", express.static(process.cwd() + "/public"));
app.use("/common", express.static(process.cwd() + "/app/common"));
app.use("/controllers", express.static(process.cwd() + "/app/controllers"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'pug');
app.use(session({
    secret: 'secretClementine',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("*", function(req, res, next) {
   console.log(`Request.Method: ${req.method}`);
   console.log(`Request.URL: ${req.url}`);
   next();
});

routes(app, passport);

// error handling
app.use(function(err, req, res, next) {
    if (err) {
      console.log(err.stack);
      res.sendStatus("500").send("<h2>I think something bad happened</h2>");
    }
      
});

app.listen(process.env.PORT || 8080, () => {
    console.log('The server is listening at port 8080');
});