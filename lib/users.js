'use strict';

function Users() {}

Users.prototype = {
  addUser: function(req, res, next) {
    var data = req.body;
    // XXX: Fake API.
    res.jsonp({ message: 'success' });
  },

  getUserData: function(req, res, next) {
    // Hard code the user info.
    var data = req.body;
    var email = req.query.email || 'evan@tseng.io';
    var userId = req.params.userId || 'evanxd';
    res.jsonp({
      id: userId,
      name: 'Evan Tseng',
      email: email,
      picture: 'https://avatars3.githubusercontent.com/u/3013038'
    });
  }
};

module.exports = new Users();
