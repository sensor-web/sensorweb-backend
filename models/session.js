'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  key: String,
  valid: Boolean,
  length: Number,
  createDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', schema);
