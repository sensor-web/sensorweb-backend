'use strict';

function Users() {}

Users.prototype = {
  addUser: function(req, res, next) {
    var data = req.body;
    // XXX: Fake API.
    res.json({ message: 'success' });
  },

  getUsers: function(req, res, next) {
    res.json({ message: 'getUsers' });
  },

  getUserData: function(req, res, next) {
    var userId = req.params.userId;
    // Hard code the user info.
    res.json({
      id: userId,
      name: 'Evan Tseng',
      email: 'evan@tseng.io',
      picture: 'https://avatars3.githubusercontent.com/u/3013038'
    });
  }
};

module.exports = new Users();
