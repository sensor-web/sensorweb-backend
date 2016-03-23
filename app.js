'use strict';

var express = require('express');
var users = require('./lib/users');
var sensors = require('./lib/sensors');
var projects = require('./lib/projects');
var config = require('./config.js');
var app = express();

// The below routers are for the webpages.
app.use(express.static('./public'));
app.route('/:userId');

// The below routers are for the REST APIs.
app.route('/users')
  .post(users.addUser);

app.route('/:userId/sensors')
  .get(sensors.getSensors);

app.route('/sensors')
  .post(sensors.addSensor);

app.route('/sensors/:sensorId')
  .get(sensors.getSensors);

app.route('/sensors/:id/data')
  .get(sensors.getSensorData)
  .post(sensors.addSensorData);

app.route('/projects')
  .get(projects.getProjects)
  .post(projects.addProject);

app.route('/projects/:id')
  .get(projects.getProjects);

app.route('/projects/:userId/:id')
  .get(projects.getProjects);

app.route('/projects/:userId/:id/sensors')
  .get(sensors.getSensors);

app.route('/projects/:userId/:id/contributors')
  .get(users.getUsers);

app.listen(config.express.port);
console.log('Listening on port ' + config.express.port);
