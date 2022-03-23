const express = require('express');
const { route } = require('express/lib/application');
const app = express();
const server = require('http').Server(app);
const {v4 : uuidv4} = require('uuid')

// setting veiw engine
app.set('view engine', 'ejs');
app.use(express.static('public'));


// home route
app.get('/', (req,res) => {
    // res.status(200).send("home");
    // res.render('room');
    res.redirect(`/${uuidv4()}`);
});



app.get('/:room1', (req,res) => {
    res.render('room', { roomId: req.params.room1 });
})





server.listen(4100);
