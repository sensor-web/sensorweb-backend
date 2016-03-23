'use strict';

function Sensors() {}

Sensors.prototype = {
  addProject: function(req, res, next) {
    res.json({ message: 'addProject' });
  },

  getProjects: function(req, res, next) {
    res.json({ message: 'getProjects' });
  }
};

module.exports = new Sensors();
