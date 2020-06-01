var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const room = require('./routes/room');
const user = require('./routes/user');
const booking = require('./routes/booking');
const statics = require('./routes/statics');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', room);
app.use('/', user);
app.use('/', booking);
app.use('/', statics);
app.use(express.static('public'))

app.listen(3000, function() {
    console.log("Server listening on port 3000");
})