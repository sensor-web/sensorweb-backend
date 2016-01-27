'use strict';

function Users() {}

Users.prototype = {
  addUser: function(req, res, next) {
    res.json({ message: 'addUser' });
  }
};

module.exports = new Users();
