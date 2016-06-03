 // app/routes.js

// grab the nerd model we just created
var current = require('./models/current');
var voltage = require('./models/voltage');
var power = require('./models/power');
var async = require('async');

var mongoCon    = require('../../mongo');
mongoCon(1);

module.exports = function(app) {
    app.get('/upCurrent', function(req, res) {
      current.findOne({}).sort({ 'created' : -1 }).exec(function (err, data) {
        if (err){
          res.send({'status':'bad'});
        }
        else{
          res.send(data);
          // console.log("corrente enviada");
        }
      });
    });

    app.get('/upVoltage', function(req, res) {
      voltage.findOne({}).sort({ 'created' : -1 }).exec(function (err, data) {
        if (err){
          res.send({'status':'bad'});
        }
        else{
          res.send(data);
          // console.log("corrente enviada");
        }
      });
    });

    app.get('/upPower', function(req, res) {
      power.findOne({}).sort({ 'created' : -1 }).exec(function (err, data) {
        if (err){
          res.send({'status':'bad'});
        }
        else{
          res.send(data);
          // console.log("corrente enviada");
        }
      });
    });

    app.get('/filipe', function(req, res) {
      res.send("Filipe is lindo");
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

};
