const Order = require('../models/order');
const {connection} = require("../database");
const express = require('express');
const router = express.Router();

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
router.post("/", (req, res) => {
    const {UserId, OrderDate, ProductList} = req.body;
    Order.addOrder(connection, UserId, OrderDate, ProductList, (result) => {
        res.json(result); 
    });
});

module.exports = router;