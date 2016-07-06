'use strict';

var config = require('../config');
var User = require('../models/user');
var Session = require('../models/session');

function Users() {}

Users.prototype = {
  addUser: function(req, res, next) {
    var data = req.body;
    var sessionKey = data.session;
    Session.findOne({ key: sessionKey }, function(err, session) {
      if (err) {
        res.jsonp({ result: 'fail', message: err });
      }
      if (session && session.key === sessionKey) {
        var user = new User({
          userId: data.userId,
          name: data.name,
          email: data.email,
          publicEmail: data.publicEmail,
          picture: data.picture
        });
        user.save(function (err) {
          if (err) {
            res.jsonp({ result: 'fail', message: err });
          } else {
            res.jsonp({ result: 'success' });
          }
        });
      } else {
        res.jsonp({ result: 'fail', message: 'The session key is invalid.' });
      }
    });
  },

  getUserData: function(req, res, next) {
    var query = {};
    var email = req.query.email;
    var userId = req.params.userId;

    if (email) {
      query.email = email;
    }
    if (userId) {
      query.userId = userId;
    }
    if (!email && !userId) {
      res.jsonp({ result: 'fail', message: 'Please provide the email.' });
      return;
    }
    User.find(query,
      { _id: false, name: false, publicEmail: false, email: false, __v: false },
      function (err, user) {
        if (err) return console.error(err);
        if (user.length) {
          user = user[0];
        }
        res.jsonp(user);
      });
  }
};

module.exports = new Users();
