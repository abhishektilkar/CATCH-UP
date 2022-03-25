const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {v4 : uuidv4} = require('uuid');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug : true
})

// setting veiw engine
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use('/peerjs',peerServer);


// home route
app.get('/', (req,res) => {
    // res.status(200).send("home");
    // res.render('room');
    res.redirect(`/${uuidv4()}`);
});



app.get('/:room1', (req,res) => {
    res.render('room', { roomId: req.params.room1 });
})

io.on('connection', socket => {
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected');
    })
})





server.listen(4100);
