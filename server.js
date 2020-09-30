var express = require('express');
var app = express();
var server = require('http').Server(app);
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
server.listen(PORT);

console.log('Server started on port ' + PORT);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {
   console.log("new connection" + socket.id);
	console.log(socket);
	
	socket.on("mouse", mouseMsg);
	
	function mouseMsg(data) {
		// emit just client
		//socket.broadcast.emit("mouse", data);
		
		// include client
		io.sockets.emit("mouse", data);
		console.log(data);
	}
	
	
});

