'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sensorSchema = new Schema({
  userId: String,
  projectId: String,
  name: String,
  description: String,
  coords: String
});

var Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
