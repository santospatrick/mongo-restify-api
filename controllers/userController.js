var helpers = require('../config/helpers.js')
var UserModel = require('../models/userModel.js')

module.exports = function (server) {

  server.get('/', function (req, res, next) {
    UserModel.find({}, function (err, users) {
      helpers.success(res, next, users)
    })
  })

  server.get('/user/:id', function (req, res, next) {
    req.assert('id', 'Id is required and must be numeric').notEmpty()
    var errors = req.validationErrors()
    if (errors) {
      helpers.failure(res, next, errors[0], 400)
    }
    UserModel.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        helpers.failure(res, next, 'Something went wrong while fetching the user from the database', 500)
      }
      if (user === null){
        helpers.failure(res, next, 'The specified user could not be found', 404)
      }
      helpers.success(res, next, user)
    })
  })

  server.post('/user', function (req, res, next) {
    req.assert('first_name', 'First Name is required').notEmpty()
    req.assert('last_name', 'Last Name is required').notEmpty()
    req.assert('email_address', 'Email address is required and must be a valid email').notEmpty().isEmail()
    req.assert('career', 'Career must be either student, teacher or professor').isIn(['student', 'teacher', 'professor'])
    var errors = req.validationErrors()
    if (errors) {
      helpers.failure(res, next, errors, 400)
    }
    var user = new UserModel()
    user.first_name = req.params.first_name
    user.last_name = req.params.last_name
    user.email_address = req.params.email_address
    user.career = req.params.career
    user.save(function(err){
        helpers.failure(res, next, errors, 500)
    })
    helpers.success(res, next, user)
  })

  server.put('/user/:id', function (req, res, next) {
    req.assert('id', 'Id is required and must be numeric').notEmpty().isInt()
    var errors = req.validationErrors()
    if (errors) {
      helpers.failure(res, next, errors[0], 400)
    }
    if (typeof (users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'the specified user could not be found', 404)
    }
    var user = users[parseInt(req.params.id)]
    var updates = req.params
    for (var field in updates) {
      user[field] = updates[field]
    }

    helpers.success(res, next, user)
  })

  server.del('user/:id', function (req, res, next) {
    req.assert('id', 'Id is required and must be numeric').notEmpty().isInt()
    var errors = req.validationErrors()
    if (errors) {
      helpers.failure(res, next, errors[0], 400)
    }
    if (typeof (users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'the specified user could not be found', 404)
    }
    delete users[parseInt(req.params.id)]
    helpers.success(res, next, [])
  })
}