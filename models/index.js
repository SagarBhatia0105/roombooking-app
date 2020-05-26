const { Sequelize, DataTypes } = require('sequelize');
const roomModel = require('./room');
const userModel = require('./user');
const bookingModel = require('./booking');

const sequelize = new Sequelize('roombookingapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+05:30',
})

const room = roomModel(sequelize, DataTypes);
const user = userModel(sequelize, DataTypes);
const booking = bookingModel(sequelize, DataTypes);

// room.belongsToMany(user, { through: 'booking' });
user.hasMany(booking);
room.hasMany(booking);

sequelize.sync({ force: false})
    .then(() => {
        console.log("Database synced!");
    }
);

module.exports = {
    room,
    user,
    booking,
    sequelize
};