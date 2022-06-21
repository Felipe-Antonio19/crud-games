const sequelize = require("sequelize");
const connection = new sequelize('games','root','1234',{
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection