'use strict';

function Users() {}

Users.prototype = {
  addUser: function(req, res, next) {
    res.json({ message: 'addUser' });
  },

  getUsers: function(req, res, next) {
    res.json({ message: 'getUsers' });
  }
};

module.exports = new Users();
