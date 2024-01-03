const {User} = require('../models/user');
const express = require('express');
const {connection} = require("../database");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const router = express.Router();

router.post("/", (req, res) => {
    let { email, password } = req.body;
    User.login(connection, email, (result) => {
        if (result.length > 0) {
            const user = result[0];
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (isPasswordCorrect) {
                // User is logged in

                // Create token
                const token = jwt.sign({id: user.UserId, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: 86400});   
                res.status(200).send({
                    user: user.email,
                    auth: true,
                    token: token,
                    message: "User is logged in"
                });
            } else {
                res.status(401).json({message: "Wrong password"});
            }
        } else {
            res.status(404).json({message: "User not found"});
        }
    });
});

module.exports = router;