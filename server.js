let PORT = process.env.PORT || 3000;
let express = require('express');
let app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
	console.log('User connected via socket.io!');

	socket.on('message', (message) => {
		console.log(`Message received: ${message.text}`);
		io.emit('message', message);
	});

	socket.emit('message', {
		text: 'Welcome to the chat application!' 
	});
});

http.listen(PORT, function(){
	console.log('Server started');
});