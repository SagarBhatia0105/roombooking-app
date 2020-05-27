var routes = require('express').Router();
var { booking, room, sequelize } = require('../models/index');
const {verifyToken} = require('../middleware/token');
const{ Op } = require('sequelize'); 

/**
 * route to create a room
 */
routes.post('/roomtype', verifyToken, (req, res) => {
    console.log(req.body);
    room.create({
        type: "Suite",
        features: "Free-toiletries Kitchen Washing Machine Sofa Towels King-Size Bed",
        room_count: 1
    }).then(() => {
        res.status(201).send("room created");
    }).catch((e) => {
        res.send(e);
    })
});

/**
 * route to get all the rooms
 */
routes.get('/roomtypes', (req, res) => {
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
routes.get('/roomtype/:id', (req, res) => {
    room.findAll({
        where: {
            id: req.params.id
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
routes.get('/roomtype/:type', (req, res) => {
    room.findAll({
        where: {
            type: req.params.type
        }
    }).then((result) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(404).send(e);
    })
})

/**
 * route to update number of rooms by room type
 */
routes.put('/roomtype/:type', verifyToken,(req, res) => {
    room.update({room_count: 2}, {
        where: {
            type: req.params.type
        }
    }).then(() => {
        res.send("number of rooms updated");
    }).catch((e) => {
        res.send(e.message);
    });

});

/**
 * route to get the number of rooms avalable by room type
 * for a particular date
 */
routes.get('/roomcount/:type', async (req, res) => {
    var roomType = req.params.type;
    var fromDate = "2020-05-18 23:59:00";
    var toDate = "2020-05-20 23:59:00"
    try{
        var countOfType = await room.findAll({
            attributes: ['room_count'],
            where: {
                type: roomType
            }
        });
        countOfType = countOfType[0]['dataValues']['room_count'];
        console.log(countOfType);
        var countOfBooking = await booking.count({
            where: {
                [Op.and]:{
                    type: roomType,
                    [Op.or]:{
                        from:{
                            [Op.lt]: toDate
                        },
                        to:{
                            [Op.gt]: fromDate
                        }
                    }
                }
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