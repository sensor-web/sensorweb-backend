'use strict';

var Sensor = require('../models/sensor');

function Sensors() {}

Sensors.prototype = {
  addSensor: function(req, res, next) {
    var sensorData = req.body;
    var sensor = new Sensor({
      userId: sensorData.userId,
      projectId: sensorData.projectId,
      name: sensorData.name,
      description: sensorData.description,
      coords: sensorData.coords
    });
    sensor.save(function (err) {
      if (err) {
        console.error(err);
        res.json({ message: 'fail' });
      } else {
        res.json({ message: 'success' });
      }
    });
  },

  addSensorData: function(req, res, next) {
    res.json({ message: 'addSensorData' });
  },

  getSensors: function(req, res, next) {
    var query = {};
    var sensorId = req.params.sensorId;
    var userId = req.params.userId;
    var projectId = req.params.projectId;
    if (projectId) {
      query.projectId = projectId;
    } else {
      if (sensorId) {
        query._id = sensorId;
      }
      if (userId) {
        query.userId = userId;
      }
    }
    Sensor.find(query, function (err, sensors) {
      if (err) return console.error(err);
      res.json(sensors);
    });
  },

  getSensorData: function(req, res, next) {
    res.json({ message: 'getSensorData' });
  }
};

module.exports = new Sensors();
