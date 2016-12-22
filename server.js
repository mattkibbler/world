
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Entity = require("./src/model/abstract/entity");
var data;

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});



var Director = require("./src/controller/director");

var director;

Entity.getById(1).then((world) => {
	director = new Director({
		io,
		world
	});
	director.startLoop();

	io.on('connection', function (socket) {
		socket.emit('welcome', { world: world.forApi() });
	});

	server.listen(3000);

});








