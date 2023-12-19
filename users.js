const express = require("express");
const bodyParser = require('body-parser');
const mysql = require("mysql");
const morgan = require("morgan");
require('dotenv').config();

const app = express();



// Gelen JSON veriyi parse edebilmek için body parser
app.use(bodyParser.json());

// Gelen istekleri loglamak için morgan
app.use(morgan('tiny'));


// Database Bağlantısı, Bilgileri .env'de tutuyoruz 
const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


// /api/users dizinine gelen get isteğinde tüm userları döndür
app.get("/api/users", (req, res) => {
    connection.query("SELECT * FROM users", (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

// /api/users/UserId şeklinde get isteğinde UserId'ye göre user döndür
app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM users WHERE UserId = ?", [id], (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

// /api/users dizinine gelen post isteğinde user ekle
app.post("/api/users", (req, res) => {
    const { name, email , password} = req.body;
    connection.query("INSERT INTO users (name, email, password) VALUES (?,?,?)", 
    [name, email, password], (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

// api/users/UserId şeklinde delete isteği atıldığında UserId'ye göre siler
app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    connection.query("DELETE FROM users WHERE UserId = ?", [id], (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

// api/users/UserId şeklinde put isteği atıldığında UserId'ye göre günceller
app.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const { name, email , password} = req.body;
    connection.query("UPDATE users SET name = ?, email = ?, password = ? WHERE UserId = ?", 
    [name, email, password, id], (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});


// Server 3001. portta çalışıyor
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));

