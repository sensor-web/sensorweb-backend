'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sensorSchema = new Schema({
  userId: String,
  programId: String,
  name: String,
  description: String,
  coordinate: String
});

var Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
