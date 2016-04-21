'use strict';

var config = require('../config');
var Sensor = require('../models/sensor');
var Pm25Data = require('../models/pm25-data');

function Sensors() {}

Sensors.prototype = {
  addSensor: function(req, res, next) {
    if (config.closedBeta) {
      return res.jsonp({ result: 'fail',
        message: 'Currently we are doing closed beta. You cannot sing up.' });
    }
    var creatorId = req.params.userId;
    var projectName = req.params.projectName;
    var data = req.body;
    var sensor = new Sensor({
      userId: data.userId,
      projectKey: { creatorId: creatorId, projectName: projectName },
      name: data.name,
      description: data.description,
      coords: JSON.parse(data.coords),
      address: data.address
    });
    // TODO: Do authentication.
    var token = data.token;
    if (token) {
      sensor.save(function (err) {
        if (err) {
          console.error(err);
          res.jsonp({ result: 'fail',
            message: 'Error of writing data in the database.' });
        } else {
          res.jsonp({ result: 'success' });
        }
      });
    } else {
      res.jsonp({
        result: 'fail',
        message: 'Authentication error.'
      });
    }
  },

  editSensor: function(req, res, next) {
    if (config.closedBeta) {
      return res.jsonp({ result: 'fail',
        message: 'Currently we are doing closed beta. You cannot sing up.' });
    }
    var message = {};
    var data = req.body;
    var sensorId = req.params.sensorId;
    // TODO: Do authentication.
    var token = data.token;
    if (token) {
      Sensor.find({ _id: sensorId }, function (err, sensors) {
        if (err) return console.error(err);
        var sensor = sensors[0];
        sensor.set('name', data.name);
        sensor.set('description', data.description);
        sensor.set('projectKey', {
          creatorId: data.creatorId, projectName: data.projectName
        });
        sensor.set('address', data.address);
        sensor.set('coords', JSON.parse(data.coords));
        sensor.save(function() {
          if (err) {
            message.result = 'fail';
            message.message = 'Error of editing data in database.';
            console.error(err);
          } else {
            message.result = 'success';
          }
        });
      });
    } else {
      message.result = 'fail';
      message.message = 'Authentication error.';
    }
    res.jsonp(message);
  },

  deleteSensor: function(req, res, next) {
    if (config.closedBeta) {
      return res.jsonp({ result: 'fail',
        message: 'Currently we are doing closed beta. You cannot sing up.' });
    }
    var message = {};
    var sensorId = req.params.sensorId;
    var data = req.body;
    // TODO: Do authentication.
    var token = data.token;
    if (token) {
      Sensor.remove({ _id: sensorId }, function(err) {
        if (err) {
          message.result = 'fail';
          message.message = 'Error of deleting data in the database.';
          console.error(err);
        }
        else {
          message.result = 'success';
        }
      });
    } else {
      message.result = 'fail';
      message.message = 'Authentication error.';
    }
    res.jsonp(message);
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
        res.jsonp({ message: 'fail' });
      } else {
        res.jsonp({ message: 'success' });
      }
    });
  },

  getSensors: function(req, res, next) {
    var query = {};
    var sensorId = req.params.sensorId;
    var userId = req.params.userId;
    var projectName = req.params.projectName;
    if (userId && projectName) {
      query.projectKey = {
        creatorId: userId, projectName: projectName
      };
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
      res.jsonp(sensors);
    });
  },

  getSensorData: function(req, res, next) {
    var DATA_FOR_8_HOURS = 720;
    var query = {};
    var sensorId = req.params.sensorId;
    if (sensorId) {
      query.sensorId = sensorId;
    }
    Pm25Data.find(query, { _id: false, datetime: true, pm25Index: true })
      .limit(DATA_FOR_8_HOURS).sort({ datetime: -1 })
      .exec(function(err, sensors) {
        if (err) {
          res.jsonp({ result: 'fail', message: err });
          return console.error(err);
        }
        res.jsonp(sensors);
      });
  }
};

module.exports = new Sensors();
