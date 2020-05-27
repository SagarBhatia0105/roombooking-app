'use strict'
module.exports = (sequelize, DataTypes) => {
    var Room = sequelize.define(
        'room', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }, 
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            features:{
                type: DataTypes.STRING,
                allowNull: false
            },
            room_count: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }
    );  
    return Room;
}