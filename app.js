'use strict';

var express = require('express');
var users = require('./lib/users');
var sensors = require('./lib/sensors');
var config = require('./config.js');
var app = express();

app.use(express.static('./public'));

app.route('/users')
  .post(users.addUser);

app.route('/sensors')
  .get(sensors.getSensors)
  .post(sensors.addSensor);

app.route('/sensors/:id')
  .get(sensors.getSensor);

app.route('/sensors/:id/data')
  .get(sensors.getSensorData)
  .post(sensors.addSensorData);

app.listen(config.express.port);
console.log('Listening on port ' + config.express.port);
