'use strict'
module.exports = (sequelize, DataTypes) => {
    var Room = sequelize.define(
        'room', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }, 
            room_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            room_number: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            floor_number: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }
    );  
    return Room;
}