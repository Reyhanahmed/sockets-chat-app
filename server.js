let PORT = process.env.PORT || 3000;
let express = require('express');
let app = express();

let http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function(){
	console.log('Server started');
})