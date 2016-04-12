'use strict';

var Sensor = require('../models/sensor');
var Pm25Data = require('../models/pm25-data');

function Sensors() {}

Sensors.prototype = {
  addSensor: function(req, res, next) {
    var data = req.body;
    var sensor = new Sensor({
      userId: data.userId,
      projectId: data.projectId,
      name: data.name,
      description: data.description,
      coords: data.coords,
      address: data.address
    });
    // TODO: Do authentication.
    var token = data.token;
    if (token) {
      sensor.save(function (err) {
        if (err) {
          console.error(err);
          res.json({ result: 'fail', message: 'Error of writing data in the database.' });
        } else {
          res.json({ result: 'success' });
        }
      });
    } else {
      res.json({
        result: 'fail',
        message: 'Authentication error.'
      });
    }
  },

  addSensorData: function(req, res, next) {
    var data = req.body;
    var sensorId = req.params.sensorId;
    var datetime = new Date();
    var pm25Index = data.pm25Index;
    var sensorData = new Pm25Data({
      datetime: datetime,
      sensorId: sensorId,
      pm25Index: pm25Index
    });

    Sensor.find({ _id: sensorId }, function (err, sensors) {
      if (err) return console.error(err);
      var sensor = sensors[0];
      sensor.set('latestUpdate', datetime);
      sensor.set('pm25Index', pm25Index);
      sensor.save(function() {
        err && console.error(err);
      });
    });

    sensorData.save(function (err) {
      if (err) {
        console.error(err);
        res.json({ message: 'fail' });
      } else {
        res.json({ message: 'success' });
      }
    });
  },

  getSensors: function(req, res, next) {
    var query = {};
    var sensorId = req.params.sensorId;
    var userId = req.params.userId;
    var projectName = req.params.projectName;
    if (projectName) {
      // XXX: FIX ME. `query.projectId` should change to `query.projectName`.
      query.projectId = projectName;
    } else {
      if (sensorId) {
        query._id = sensorId;
      }
      if (userId) {
        query.userId = userId;
      }
    }
    Sensor.find(query).sort({ datetime: -1 }).exec(function (err, sensors) {
      if (err) return console.error(err);
      res.json(sensors);
    });
  },

  getSensorData: function(req, res, next) {
    var query = {};
    var sensorId = req.params.sensorId;
    if (sensorId) {
      query.sensorId = sensorId;
    }
    Pm25Data.find(query).sort({ datetime: -1 }).exec(function(err, sensors) {
      if (err) return console.error(err);
      res.json(sensors);
    });
  }
};

module.exports = new Sensors();
