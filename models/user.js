'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  userId: String,
  name: String,
  email: String,
  publicEmail: String,
  picture: String,
  createDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', schema);
