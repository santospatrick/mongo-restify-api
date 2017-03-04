var restify = require('restify')
var server = restify.createServer()

var users = {}
var max_user_id = 0

server.use(restify.acceptParser(server.acceptable))
server.use(restify.bodyParser())
server.use(restify.queryParser())

server.get('/', function(req, res, next) {
    var response = {
        'status': 'success',
        'data': users
    }

    res.setHeader('content-type', 'application/json')
    res.writeHead(200)
    res.end(JSON.stringify(response))
    return next()
})

server.listen(8080, function() {
    console.log('listening at', server.name, server.url)
})