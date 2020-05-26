const saltRounds = 10;
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: async (User) => {
                console.log(User.password);
                salt = await bcrypt.genSalt(saltRounds);
                hash = await bcrypt.hash(User.password, salt);
                console.log(User.password+" "+hash);
                User.password = hash;
            }
        }
    });

    return User;
}