'use strict';

var mongoose = require('mongoose');
var config = require('../config');
var Session = require('../models/session');
var Sensor = require('../models/sensor');
var SensorDataSchema = require('../schemas/sensor-data');
// TOOD: Remove the `Pm25Data` model.
var Pm25Data = require('../models/pm25-data');

function Sensors() {}

Sensors.prototype = {
  addSensor: function(req, res, next) {
    var data = req.body;
    var sessionKey = data.session;
    Session.findOne({ key: sessionKey }, function(err, session) {
      if (err) {
        res.jsonp({ result: 'fail', message: err });
      }
      if (session && session.key === sessionKey) {
        var creatorId = req.params.userId;
        var projectName = req.params.projectName;
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
      } else {
        res.jsonp({ result: 'fail', message: 'The session key is invalid.' });
      }
    });
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
    var data = req.body;
    var sessionKey = data.session;
    Session.findOne({ key: sessionKey }, function(err, session) {
      if (err) {
        res.jsonp({ result: 'fail', message: err });
      }
      if (session && session.key === sessionKey) {
        var sensorId = req.params.sensorId;
        Sensor.remove({ _id: sensorId }, function(err) {
          var message = { result: 'success' };
          if (err) {
            message.result = 'fail';
            message.message = err;
          }
          res.jsonp(message);
        });
      } else {
        res.jsonp({ result: 'fail', message: 'The session key is invalid.' });
      }
    });
  },

  addSensorData: function(req, res, next) {
    var data = req.body;
    var datetime = new Date();
    var sensorId = req.params.sensorId;
    var pm10 = data.pm10;
    // FIXME: Let's remove the `data.pm25Index` variable.
    var pm25 = data.pm25 || data.pm25Index;
    var pm100 = data.pm100;
    Sensor.find({ _id: sensorId }, function (err, sensors) {
      if (err) return console.error(err);
      var sensor = sensors[0];
      if (sensor) {
        sensor.set('latestUpdate', datetime);
        sensor.set('pm25Index', pm25);
        sensor.save(function() {
          err && console.error(err);
        });
        // FIXME: Remove the hard code ID.
        if (sensorId !== '5714bf16329a6f015df48719') {
          var data = {};
          if (pm10) data.pm10 = parseInt(pm10);
          if (pm25) data.pm25 = parseInt(pm25);
          if (pm100) data.pm100 = parseInt(pm100);
          // Defind a new model dynamically for sensor data.
          var SensorData = mongoose.model(
            `Sensor${sensorId}Data`, SensorDataSchema
          );
          new SensorData({ data: data })
            .save(function (err) {
              if (err) {
                console.error(err);
                res.jsonp({ result: 'fail' });
              } else {
                res.jsonp({ result: 'success' });
              }
            });
        } else {
          new Pm25Data({
            datetime: datetime,
            sensorId: sensorId,
            pm25Index: pm25
          })
          .save(function (err) {
            if (err) {
              console.error(err);
              res.jsonp({ result: 'fail' });
            } else {
              res.jsonp({ result: 'success' });
            }
          });
        }
      } else {
        console.log('No such sensor.');
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
    var DATA_LENGTH_FOR_12_HOURS = 720;
    var query = {};
    var sensorId = req.params.sensorId;
    if (sensorId) {
      query.sensorId = sensorId;
    }
    // FIXME: Remove the hard code ID.
    if (sensorId !== '5714bf16329a6f015df48719') {
      // Defind a new model dynamically for sensor data.
      var SensorData = mongoose.model(
        `Sensor${sensorId}Data`, SensorDataSchema
      );
      SensorData.find({}, { _id: false, datetime: true, data: true })
        .limit(DATA_LENGTH_FOR_12_HOURS).sort({ datetime: -1 })
        .exec(function(err, sensors) {
          if (err) {
            res.jsonp({ result: 'fail', message: err });
            return console.error(err);
          }
          res.jsonp(sensors);
        });
    } else {
      Pm25Data.find(query, { _id: false, datetime: true, pm25Index: true })
        .limit(DATA_LENGTH_FOR_12_HOURS).sort({ datetime: -1 })
        .exec(function(err, sensors) {
          if (err) {
            res.jsonp({ result: 'fail', message: err });
            return console.error(err);
          }
          res.jsonp(sensors);
        });
    }
  }
};

module.exports = new Sensors();
