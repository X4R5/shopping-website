const express = require("express");
const Product = require("../models/product");
const {connection} = require("../database");
const router = express.Router();
const authenticateToken = require("../helpers/jwt");

// GET endpoint to retrieve product by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Product.getProductById(connection, id, (result) => {
        res.json(result);
    });
});

// GET endpoint to retrieve all products
router.get('/', (req, res) => {
    Product.getAllProducts(connection, (result) => {
        res.json(result);
    });
});

// POST endpoint to add a new product
router.post('/', authenticateToken, (req, res) => {
    const isAdmin = req.user.isAdmin;
    const { category_id, product_image, product_name, product_price, product_stock, product_desc } = req.body;
    if(isAdmin == "TRUE"){
        Product.addProduct(connection, category_id, product_image, product_name, product_price, product_stock, 
            product_desc, (result) => {
            res.json(result);
        });
    }
    else{ //return status and message
        res.status(401).json({
            status: "error",
            message: "Unauthorized"
        });
    } });

// PUT endpoint to update product by id
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { category_id, product_image, product_name, product_price, product_stock, product_desc } = req.body;
    Product.updateProductById(connection, id, category_id, product_image, product_name, product_price, 
        product_stock, product_desc, (result) => {
        res.json(result);
    });
});

// DELETE endpoint
router.delete('/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const isAdmin = req.user.isAdmin;
    if(isAdmin == "TRUE"){
        Product.deleteProductById(connection, id, (result) => {
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

// GET endpoint to get productCount
router.get('/getCount', (req, res) => {
    Product.getProductCount(connection, (result) => {
        res.json(result);
    });
});

// GET endpoint to get first 4 products by category_id
router.get('/homepage/:id', (req, res) => {
    const id = req.params.id;
    Product.getFirst4ProductsByCategoryId(connection, id, (result) => {
        res.json(result);
    });
});

// GET endpoint to get all categories
router.get('/categories/1', (req, res) => {
    Product.getAllProductCategories(connection, (result) => {
        res.json(result);
    });
});

// GET endpoint to get all products by category id
router.get('/category/:id', (req, res) => {
    const id = req.params.id;
    Product.getAllProductsByCategoryId(connection, id, (result) => {
        res.json(result);
    });
});

router.get('/d/discounted', (req, res) => {
    Product.getDiscountedProducts(connection, (result) => {
        res.json(result);
    });
    });

module.exports = router;