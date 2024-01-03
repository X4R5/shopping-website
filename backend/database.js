const mysql = require("mysql");
require('dotenv').config();

// Create connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
// Connect to database
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to database");
});

module.exports = {connection};