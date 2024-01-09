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
router.get("/:id", (req, res) => {
    const orderId = req.params.id;
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

// GET endpoint to retrieve orders by userId
router.get("/c/user", authenticateToken, (req, res) => {
    const userId = req.user.id;
    Order.getOrderDetails(connection, userId, (result) => {
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

// POST endpoint to update order status
router.post("/updateStatus/:id", authenticateToken, (req, res) => {
    const isAdmin = req.user.isAdmin;
    console.log(isAdmin);
    const status = "Siparis Teslim Edildi";
    const orderId = req.params.id;
    if(isAdmin == "TRUE"){
        Order.updateOrderStatus(connection, orderId, status, (result) => {
            res.json(result);
        });
    }
    else{ //return status and message
        res.status(401).json({
            status: "error",
            message: "Unauthorized"
        });
    }
});

module.exports = router;