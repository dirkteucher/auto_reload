var fs = require('fs'),
    http = require('http'),
    socketio = require('socket.io');
var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(3000, function() {
    console.log('Listening at: http://localhost:3000');
});
socketio.listen(server).on('connection', function (socket) {


  //Update the filename or create a new fs.watchFile to add a new file
  fs.watchFile("./public/css/app.css", { persistent: true, interval: 500 }, function(event, fileName) {
              socket.broadcast.emit('message', "modified2");
              console.log(fileName+ "Changed, reloading page.")
    });
	// Here is a second watcher for the js
  fs.watchFile("./public/js/app.js", { persistent: true, interval: 500 }, function(event, fileName) {
              socket.broadcast.emit('message', "modified2");
              console.log(fileName+ "Changed, reloading page.")
    });

});
