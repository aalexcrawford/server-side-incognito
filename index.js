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
    // Each socket.on is the channel being handled
        // msg is the JSON information 
        console.log("Chat message received");
		io.emit('chat message', msg);
        // 'chat message' is the even being handled
        // Server emit sends to everyone connected to socket
        console.log(msg.message);
        // msg.message is the message being sent in the JSON
        });
    socket.on('PM', msg => {
        console.log("Private message received");
        io.emit('PM', msg);
        });
    socket.on('P2P Message', msg => {
        console.log("This is a P2P Message");
        io.to(msg.socketID).emit('P2P Message', msg);
    });
});

http.listen(port, () => {
	  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
