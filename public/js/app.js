let socket = io();

// name of the event has to be the same as the one you want to listen from the server.js file,
// but 'connect' and 'connection' are interchangeable
socket.on('connection', () => {
	console.log('Connected to socket.io server');
});

socket.on('message', (message) => {
	console.log(`New message: ${message.text}`);
});

