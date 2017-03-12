var restify = require('restify')
var server = restify.createServer()
var setup = require('./controllers/setup.js')
var userController = require('./controllers/userController.js')

setup(server, restify)
userController(server)

server.listen(8080, function () {
  console.log('listening at', server.name, server.url)
})