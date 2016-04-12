'use strict';

function Sensors() {}

Sensors.prototype = {
  addProject: function(req, res, next) {
    res.json({ message: 'addProject' });
  },

  getProjects: function(req, res, next) {
    var userId = req.params.userId;
    // Hard code the project info.
    res.json([{
      id: 'pm25',
      name: 'PM2.5',
      description: 'We are working on a pilot project to build a crowdsourced PM2.5 air pollution sensor network. PM2.5 air pollution is a growing global issue. Governments around the world are asked to publish open data of PM2.5 index from their monitoring stations. The problem is that governments and companies can only set up a limited number of stations.'
    }]);
  },

  getContributors: function(req, res, next) {
    var userId = req.params.userId;
    var projectName = req.params.projectName;
    // Hard code the contributors list.
    res.json([{
      id: 'evanxd',
      name: 'Evan Tseng',
      email: 'evan@tseng.io',
      picture: 'https://avatars3.githubusercontent.com/u/3013038'
    }]);
  },
};

module.exports = new Sensors();
