const {User} = require('../models/user');
const express = require('express');
const {connection} = require("../database");
const authenticateToken = require("../helpers/jwt");
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { text } = require('body-parser');
require('dotenv').config();

// GET endpoint to retrieve all users
router.get("/", (req, res) => {
    User.getAllUsers(connection, (result) => {
        res.json(result);
    });
});

// GET endpoint to retrieve user by id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    User.getUserById(connection, id, (result) => {
        res.json(result);
    });
});

// GET endpoint to retrieve user by id
router.get("/c/user", authenticateToken, (req, res) => {
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
router.post("/login", (req, res) => {
    let { email, password } = req.body;
    User.login(connection, email, (result) => {
        if (result.length > 0) {
            const user = result[0];
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (isPasswordCorrect) {
                // User is logged in

                // Create token
                const token = jwt.sign({id: user.UserId, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: 86400});   
                if(user.isAdmin === "TRUE"){
                    res.status(200).send({
                        user: user.email,
                        auth: true,
                        token: token,
                        message: "Admin is logged in",
                        isAdmin: true
                    });
                }
                else{
                    res.status(200).send({
                        user: user.email,
                        auth: true,
                        token: token,
                        message: "User is logged in",
                    });
                }
            } else {
                res.status(401).json({message: "Wrong password"});
            }
        } else {
            console.log(result)
            res.status(404).json({message: "User not found"});
        }
    });
});

// POST endpoint to add information text
router.post("/information", authenticateToken, (req, res) => {
    let { text } = req.body;
    let UserId = req.user.id;

    User.addInformation(connection, UserId, text, (result) => {
        res.json(result);
    });
});

// GET endpoint to get information text
router.get("/information/get", authenticateToken, (req, res) => {
    const isAdmin = req.user.isAdmin;
    if(isAdmin == "TRUE"){
        User.getInformation(connection, (result) => {
            res.json(result);
        });
    }
    else{
        res.status(401).json({
            status: "error",
            message: "Unauthorized"
        });
    }
});

module.exports = router;