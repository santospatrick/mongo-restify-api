var restify = require('restify')
var server = restify.createServer()
var setup = require('./controllers/setup.js')
var userController = require('./controllers/userController.js')
var restifyValidator = require('restify-validator')

setup(server, restify, restifyValidator)
userController(server)

server.listen(8080, function () {
  console.log('listening at', server.name, server.url)
})