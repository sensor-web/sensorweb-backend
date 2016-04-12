'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sensorSchema = new Schema({
  userId: String,
  projectKey: { creatorId: String, projectName: String },
  name: String,
  description: String,
  coords: { lng: String, lat: String },
  address: String,
  latestUpdate: String,
  pm25Index: Number
});

var Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
