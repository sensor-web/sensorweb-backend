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

  // Get, update and delete a sensor information.
  app.route('/sensors/:sensorId')
    .get(sensors.getSensors)
    .put(sensors.editSensor)
    .delete(sensors.deleteSensor);

  // Get a sensor's information and data.
  app.route('/sensors/:sensorId/data')
    .get(sensors.getSensorData)
    .post(sensors.addSensorData);

  // Get a project information.
  app.route('/projects/:userId/:projectName')
    .get(projects.getProjects);

  // Get project's sensor list and add a sensor for a project.
  app.route('/projects/:userId/:projectName/sensors')
    .get(sensors.getSensors)
    .post(sensors.addSensor);

  // Get project's contributor list.
  app.route('/projects/:userId/:projectName/contributors')
    .get(projects.getContributors);

  // Get user information by email and add a user.
  app.route('/users')
    // Get user data by email: `/users?email=[USER_EMAIL]`.
    .get(users.getUserData)
    .post(users.addUser);

  // Get user information by user ID.
  app.route('/users/:userId')
    .get(users.getUserData);

  // Get user's sensor list.
  app.route('/users/:userId/sensors')
    .get(sensors.getSensors);

  // Get user's project list.
  app.route('/users/:userId/projects')
    .get(projects.getProjects);
});

app.listen(config.express.port);
console.log('Listening on port ' + config.express.port);
