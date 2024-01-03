const express = require("express");
const Comment = require("../models/comment");
const {connection} = require("../database");
const router = express.Router();

router.get('/', (req, res) => {
    Comment.getAllComments(connection, (result) => {
        res.json(result);
    });
});

// http://localhost:3000/api/comments/(comment_id)/(product_id)
router.get('/:product_id', (req, res) => {
    const product_id = req.params.product_id;
    Comment.getCommentsByProductId(connection, product_id, (result) => {
        res.json(result);
    });
});

router.get('/:id', (req, res) => {
    const comment_id = req.params.id;
    Comment.getCommentByCommentId(connection, comment_id, (result) => {
        res.json(result);
    });
});

router.post('/', (req, res) => {
    const {product_id, user_id, comment, rating} = req.body;
    Comment.addComment(connection, product_id, user_id, comment, rating, (result) => {
        res.json(result);
    });
});

router.put('/:id', (req, res) => {
    const comment_id = req.params.id;
    const {comment, rating} = req.body;
    Comment.updateCommand(connection, comment_id, comment, rating, (result) => {
        res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    const comment_id = req.params.id;
    Comment.deleteComment(connection, comment_id, (result) => {
        res.json(result);
    });
});

router.get('/:product_id/rating', (req, res) => {
    const product_id = req.params.product_id;
    Comment.getAverageRatingByProductId(connection, product_id, (result) => {
        res.json(result);
    });
});


module.exports = router;