'use strict';

var Sensor = require('../models/sensor');

function Sensors() {}

Sensors.prototype = {
  addSensor: function(req, res, next) {
    res.json({ message: 'addSensor' });
  },

  addSensorData: function(req, res, next) {
    res.json({ message: 'addSensorData' });
  },

  getSensors: function(req, res, next) {
    var query = {};
    var sensorId = req.params.sensorId;
    var userId = req.params.userId;
    if (sensorId) {
      query._id = sensorId;
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
