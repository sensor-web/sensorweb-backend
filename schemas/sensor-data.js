'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  datetime: { type: Date, default: Date.now },
  data: {}
});

module.exports = schema;
