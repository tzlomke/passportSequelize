module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define("user",  {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        username: {
            type: Sequelize.TEXT,
            allowNull: false,
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        last_login: {
            type: Sequelize.DATE
        },
        
        status: {
            type: Sequelize.ENUM("active", "inactive"),
            defaultValue: "active"
        }
    });

    return User;
};