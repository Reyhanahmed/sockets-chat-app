let socket = io();

/* name of the event has to be the same as the one you want to listen from the server.js file,
 * but 'connect' and 'connection' are interchangeable, and should be used to connect to either
 * server or client 
 */
socket.on('connection', () => {
	console.log('Connected to socket.io server');
});

socket.on('message', (message) => {
	let momentTimestamp = moment.utc(message.timestamp);
	console.log(`New message: ${message.text}`);
	$('.messages').append(`<p><strong>${momentTimestamp.local().format('h:mm a')}: </strong>${message.text}</p>`);
});

// Handles submitting of new message
let $form = jQuery('#message-form');

$form.on('submit', (event) => {
	event.preventDefault();

	socket.emit('message', {
		text: $form.find('input[name=message]').val()
	});

	$('input[name=message]').val('');
});