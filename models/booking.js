module.exports = (sequelize, DataTypes) => {
    var Booking = sequelize.define('booking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, user_email: {
            type: DataTypes.STRING,
            isNull: false
        }, room_type: {
            type: DataTypes.STRING,
            isNull: false
        } ,from: {
            type: DataTypes.DATE,
            isNull: false
        }, to: {
            type:  DataTypes.DATE,
            isNull: false
        }
    });

    return Booking;
}