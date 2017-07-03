let name = getQueryVariable('name') || 'Anonymous';
let room = getQueryVariable('room');
let socket = io();

console.log(`${name} wants to join ${room}`);

/* name of the event has to be the same as the one you want to listen from the server.js file,
 * but 'connect' and 'connection' are interchangeable, and should be used to connect to either
 * server or client 
 */
socket.on('connect', () => {
	console.log('Connected to socket.io server');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
	console.log('YOOHHOOOO')
});

socket.on('message', (message) => {
	let momentTimestamp = moment.utc(message.timestamp);
	let $message = $('<li class="list-group-item"></li>');
	console.log(`New message: ${message.text}`);
	$message.append(`<p><strong> ${message.name} ${momentTimestamp.local().format('h:mm a')}: </strong></p>`)
	$message.append(`<p>${message.text}</p>`);
	$('.messages').append($message);
});

// Handles submitting of new message
let $form = jQuery('#message-form');

$form.on('submit', (event) => {
	event.preventDefault();

	socket.emit('message', {
		name,
		text: $form.find('input[name=message]').val()
	});

	$('input[name=message]').val('');
});

$("#room_name").text(room);