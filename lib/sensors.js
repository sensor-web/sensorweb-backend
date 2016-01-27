'use strict';

function Sensors() {}

Sensors.prototype = {
  addSensor: function(req, res, next) {
    res.json({ message: 'addSensor' });
  },

  addSensorData: function(req, res, next) {
    res.json({ message: 'addSensorData' });
  },

  getSensor: function(req, res, next) {
    res.json({ message: 'getSensor' });
  },

  getSensors: function(req, res, next) {
    res.json({ message: 'getSensors' });
  },

  getSensorData: function(req, res, next) {
    res.json({ message: 'getSensorData' });
  }
};

module.exports = new Sensors();
