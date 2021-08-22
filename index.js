const http = require('http');
const displayContent = require('./route')
const server = http.createServer(displayContent)

server.listen(3001);