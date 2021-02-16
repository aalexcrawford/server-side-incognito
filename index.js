const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	  res.sendFile(__dirname + '/index.html');
});

app.get('/pm', (req, res) => {
    res.sendFile(__dirname + '/pmIndex.html');
});

io.on('connection', (socket) => {
	console.log("Connection established");
    console.log(" %s sockets connected", io.engine.clientsCount);
	socket.on('chat message', msg => {
        console.log("Chat message received");
		io.emit('chat message', msg);
        });
    socket.on('PM', msg => {
        console.log("Private message received");
        io.emit('PM', msg);
        });
});

http.listen(port, () => {
	  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
