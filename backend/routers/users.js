const {User} = require('../models/user');
const express = require('express');
const {connection} = require("../database");
const authenticateToken = require("../helpers/jwt");
const bcrypt = require('bcryptjs');
const router = express.Router();


// GET endpoint to retrieve all users
router.get("/", (req, res) => {
    User.getAllUsers(connection, (result) => {
        res.json(result);
    });
});

// GET endpoint to retrieve user by id
router.get("/user", authenticateToken, (req, res) => {
    const id = req.user.id;
    User.getUserById(connection, id, (result) => {
        res.json(result);
    });
});

// POST endpoint to add a new user
router.post("/register", (req, res) => {
    let { name, email , password} = req.body;
    password = bcrypt.hashSync(password, 10);

    User.addUser(connection, name, email, password, (result) => {
        res.json(result);
    });
});

// PUT endpoint to update user by id
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { name, email , password} = req.body;

    User.updateUserById(connection, id, name, email, password, (result) => {
        res.json(result);
    });
});

// DELETE endpoint to delete user by id
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    User.deleteUserById(connection, id, (result) => {
        res.json(result);
    });
});

// GET endpoint to get userCount
router.get("/getCount", (req, res) => {
    User.getUserCount(connection, (result) => {
        res.json(result);
    });
});

module.exports = router;