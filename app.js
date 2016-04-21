'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var users = require('./lib/users');
var sensors = require('./lib/sensors');
var projects = require('./lib/projects');
var config = require('./config.js');
var app = express();

config.dev && app.use(express.static('./sensorweb-frontend'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods: POST');
  res.header('Access-Control-Max-Age: 1000');
  // res.header('Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.route('/').get(function(req, res, next) {
    res.jsonp({
      version: config.version,
      description: config.description,
      status: 'good'
    });
  });

  // Get all sensors API is only for testing.
  app.route('/sensors')
    .get(sensors.getSensors);

  app.route('/sensors/:sensorId')
    .get(sensors.getSensors)
    .put(sensors.editSensor)
    .delete(sensors.deleteSensor);

  app.route('/sensors/:sensorId/data')
    .get(sensors.getSensorData)
    .post(sensors.addSensorData);

  app.route('/projects/:userId/:projectName')
    .get(projects.getProjects);

  app.route('/projects/:userId/:projectName/sensors')
    .get(sensors.getSensors)
    .post(sensors.addSensor);

  app.route('/projects/:userId/:projectName/contributors')
    .get(projects.getContributors);

  app.route('/users')
    // Get user data by email: `/users?email=[USER_EMAIL]`.
    .get(users.getUserData)
    .post(users.addUser);

  app.route('/users/:userId')
    .get(users.getUserData);

  app.route('/users/:userId/sensors')
    .get(sensors.getSensors);

  app.route('/users/:userId/projects')
    .get(projects.getProjects);
});

app.listen(config.express.port);
console.log('Listening on port ' + config.express.port);
