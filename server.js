var app = require('express')();
var http = require('http').createServer(app);
const cors = require('cors');



var io = require('socket.io')(http);

var users = [];
var messages = [];


app.get('/users', (req, res) => res.json({ users }));
app.get('/messages', (req, res) => res.json({ messages }));

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
app.use(cors());

io.on('connection', (socket) => {

    socket.on('join', (data) => {
        socket.join(data.room);
        users.push({ user: data.user, id: socket.id })
        socket.broadcast.in(data.room).emit('new-user', { user: data.user });
        console.log(socket.id + " is connected.");
    });

    socket.on('message', (data) => {
        messages.push({ user: data.user, message: data.message })
        socket.broadcast.in(data.room).emit('new-message', data);
    });

});


http.listen(3000, () => {
    console.log('listening on *:3000');
});