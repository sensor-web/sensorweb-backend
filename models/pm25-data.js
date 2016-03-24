'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pm25Data = new Schema({
  datatime: Date,
  sensorId: String,
  pm25Index: Number
});

var Pm25Data = mongoose.model('Pm25Data', pm25Data);

module.exports = Pm25Data;
