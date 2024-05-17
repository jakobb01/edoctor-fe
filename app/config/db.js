import * as mysql from "mysql2";

const conn  = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306
});

conn.connect(err => {
    if (err) {
        console.log("Error connecting to MySQL database: ", err);
    } else {
        console.log("Connected to MySQL database.")
    }
});

module.exports = conn;