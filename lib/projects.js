'use strict';

function Sensors() {}

Sensors.prototype = {
  addProject: function(req, res, next) {
    res.json({ message: 'addProject' });
  },

  getProjects: function(req, res, next) {
    // Hard code the project info.
    res.json([{
      id: 'pm25',
      name: 'PM2.5',
      description: 'We are working on a pilot project to build a crowdsourced PM2.5 air pollution sensor network. PM2.5 air pollution is a growing global issue. Governments around the world are asked to publish open data of PM2.5 index from their monitoring stations. The problem is that governments and companies can only set up a limited number of stations.'
    }]);
  }
};

module.exports = new Sensors();
