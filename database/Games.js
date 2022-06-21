const sequelize = require("sequelize");
const connection = require("./connection");

const Games = connection.define("games", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,  
    },
    name:{
        type: sequelize.STRING,
        allowNull: false
    },
    year:{
        type: sequelize.STRING,
        allowNull: false
    },
    developedBy:{
        type: sequelize.STRING,
        allowNull: false
    },
    description:{
        type: sequelize.STRING,
        allowNull: false
    },
    genre:{
        type: sequelize.STRING,
        allowNull: false
    }
});

module.exports = Games;