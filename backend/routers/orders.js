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

// GET endpoint to retrieve order by orderId
router.get("/:orderId", (req, res) => {
    const orderId = req.params.orderId;
    Order.getOrderByOrderId(connection, orderId, (result) => {
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

module.exports = router;