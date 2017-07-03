let PORT = process.env.PORT || 3000;
let express = require('express');
let moment = require('moment');
let app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);

let clientInfo = {};

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
	console.log('User connected via socket.io!');

	socket.on('joinRoom', (req) => {
		clientInfo[socket.id] = req;
		socket.join(req.room);
		console.log(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment.valueOf
		})
	});

	socket.on('message', (message) => {
		console.log(`Message received: ${message.text}`);
		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message', message);
	});
	

	socket.emit('message', {
		name: 'System',
		timestamp: moment().valueOf(),
		text: 'Welcome to the chat application!'
	});
});

http.listen(PORT, function() {
	console.log('Server started');
});