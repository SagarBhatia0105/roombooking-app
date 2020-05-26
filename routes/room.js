var routes = require('express').Router();
var { booking, room, sequelize } = require('../models/index');
const {verifyToken} = require('../middleware/token');

/**
 * route to create a room
 */
routes.post('/room', verifyToken, (req, res) => {
    console.log(req.body);
    room.create({
        room_type: "general",
        room_number: 105,
        floor_number: 1
    }).then(() => {
        res.status(201).send("room created");
    }).catch((e) => {
        res.send(e);
    })
});

/**
 * route to get all the rooms
 */
routes.get('/rooms', (req, res) => {
    room.findAll().then((result) => {
        // console.log(result);
        res.json(result);
    }).catch((e) => {
        res.send(e);
    })
});

/**
 * route to get a room by id
 */
routes.get('/room/:id', (req, res) => {
    room.findAll({
        where: {
            room_id: req.params.id
        }
    }).then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(404).send(e);
    })
})

/**
 * route to get rooms by room type
 */
routes.get('/room/type/:type', (req, res) => {
    room.findAll({
        where: {
            room_type: req.params.type
        }
    }).then((result) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(404).send(e);
    })
})

/**
 * route to update a room number by room id
 */
routes.put('/room/number/:id', verifyToken,(req, res) => {
    room.update({room_number: req.body.room_number}, {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.send("room number updated");
    }).catch((e) => {
        res.send(e.message);
    });

});

/**
 * route to get the number of rooms avalable by room type
 * for a particular date
 */
routes.get('/rooms/availablebytype/:type', async (req, res) => {
    var roomType = req.params.type;
    try{
        var countOfType = await room.count({
            where: {
                room_type: roomType
            }
        });
        console.log(countOfType);

        var countOfBooking = await booking.count({
            where: {
                room_type: roomType
            }
        });
        console.log(countOfBooking)
        availableRooms = countOfType - countOfBooking;
            
        console.log(availableRooms);
        res.json({noOfRooms: availableRooms});
    }catch(e){
        console.log("Error", e);
        res.send(e);
    }
});


module.exports = routes;