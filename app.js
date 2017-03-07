var restify = require('restify')
var server = restify.createServer()

var users = {}
var max_user_id = 0

server.use(restify.acceptParser(server.acceptable))
server.use(restify.bodyParser())
server.use(restify.queryParser())

function respond (res, next, status, data, http_code) {
    var response = {
        'status': status,
        'data': data
    }
    res.setHeader('content-type', 'application/json')
    res.writeHead(http_code)
    res.end(JSON.stringify(response))
    return next()
}

function success (res, next, data) {
    respond(res, next, 'success', data, 200)
}

function failure (res, next, data, http_code) {
    respond(res, next, 'failure', data, http_code)
}

server.get('/', function(req, res, next) {
    success(res, next, users)
})

server.get('/user/:id', function(req, res, next) {
    
    var response = {
        'status': 'success',
        'data': users[parseInt(req.params.id)]
    }

    res.setHeader('content-type', 'application/json')
    res.writeHead(200)
    res.end(JSON.stringify(response))
    return next()
})

server.post('/user', function(req, res, next) {
    var user = req.params
    max_user_id++
    user.id = max_user_id
    users[user.id] = user

    res.setHeader('content-type', 'application/json')
    res.writeHead(200)
    res.end(JSON.stringify(user))
    return next()
})

server.listen(8080, function() {
    console.log('listening at', server.name, server.url)
})