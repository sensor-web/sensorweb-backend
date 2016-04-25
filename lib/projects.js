'use strict';

var User = require('../models/user');

function Projects() {}

Projects.prototype = {
  addProject: function(req, res, next) {
    res.jsonp({ message: 'success' });
  },

  getProjects: function(req, res, next) {
    var userId = req.params.userId;
    var projectName = req.params.projectName;
    // Hard code the project info.
    var data = {
      id: 'pm25',
      creator: {
        userId: 'sensorweb',
        name: 'SensorWeb'
      },
      createDate: '2016-04-13T09:48:09.909Z',
      name: 'Project PM2.5',
      description: 'We are working on a pilot project to build a crowdsourced PM2.5 air pollution sensor network. PM2.5 air pollution is a growing global issue. Governments around the world are asked to publish open data of PM2.5 index from their monitoring stations. The problem is that governments and companies can only set up a limited number of stations.'
    };
    if (!projectName) {
      data = [data];
    }
    res.jsonp(data);
  },

  getContributors: function(req, res, next) {
    var userId = req.params.userId;
    var projectName = req.params.projectName;
    // Workaround: Get all users.
    User.find({},
      { _id: false, email: false, __v: false },
      function (err, users) {
        if (err) return console.error(err);
        res.jsonp(users);
      });
  },
};

module.exports = new Projects();
