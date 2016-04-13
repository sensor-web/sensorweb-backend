'use strict';

function Projects() {}

Projects.prototype = {
  addProject: function(req, res, next) {
    res.json({ message: 'success' });
  },

  getProjects: function(req, res, next) {
    var userId = req.params.userId;
    var projectName = req.params.projectName;
    // Hard code the project info.
    var data = {
      id: 'pm25',
      name: 'PM2.5',
      description: 'We are working on a pilot project to build a crowdsourced PM2.5 air pollution sensor network. PM2.5 air pollution is a growing global issue. Governments around the world are asked to publish open data of PM2.5 index from their monitoring stations. The problem is that governments and companies can only set up a limited number of stations.'
    };
    if (!projectName) {
      data = [data];
    }
    res.json(data);
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

module.exports = new Projects();
