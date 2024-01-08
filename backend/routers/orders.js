const Order = require('../models/order');
const {connection} = require("../database");
const express = require('express');
const router = express.Router();
const authenticateToken = require("../helpers/jwt");

// GET endpoint to retrieve all orders
router.get("/", (req, res) => {
    Order.getAllOrders(connection, (result) => {
        res.json(result);
    });
});


// POST endpoint to add a new order
router.post("/", authenticateToken, (req, res) => {
    // get userId from req.headers.authorization
    userId = req.user.id;
    const {ProductList, address, deliveryOption, paymentMethod} = req.body;
    Order.addOrder(connection, ProductList, userId, address, deliveryOption, paymentMethod, (result) => {
        res.json(result);
    });
});

// GET endpoint to retrieve orders by userId
router.get("/user", authenticateToken, (req, res) => {
    const userId = req.user.id;
    Order.getOrderDetailsByOrderId(connection, userId, (result) => {
        res.json(result);
    });
});

// POST endpoint to check for couponCode
router.post("/coupon", (req, res) => {
    const {couponCode} = req.body;
    Order.checkCoupon(connection, couponCode, (result) => {
        res.json(result);
    });
}); 

module.exports = router;