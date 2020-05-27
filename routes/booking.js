var routes = require('express').Router();
const { user, booking } = require('../models/index');
const { Op } = require('sequelize');
const {verifyToken} = require('../middleware/token');

/**
 * route to create a booking
 */
routes.post('/booking', verifyToken, async (req, res) => {
    user_id = 1;
    user_email = req.body.email;
    room_id = 1;
    room_type = "Single";
    from_date = "2020-05-18 23:59:00";
    to_date = "2020-05-20 23:59:00";

    booking.create({
        userId: user_id,
        user_email: user_email,
        type: room_type,
        from: from_date,
        to: to_date,
        roomId: room_id
    }).then(() => {
        res.status(200).json("Booking confirmed");
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

/**
 * route to delete a booking
 */
routes.delete('/booking/:id', verifyToken, (req, res) => {
    booking.destroy({
        where:{
            id: req.params.id
        }
    }).then(() => {
        res.sendStatus(200);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

/**
 * route to get the bookings for a user
 */
routes.get('/mybookings', verifyToken, async (req, res) => {
    var users = await user.findAll({
        where: {
            email: req.body.email
        }
    });
    console.log(users[0].id);
    
    booking.findAll({
        where:{
            userId: users[0].id
        }
    })
    .then((result) => {
        res.json(result);
    }).catch((e) => {
        res.sendStatus(500);
    });
});

module.exports = routes;