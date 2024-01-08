const express = require("express");
const Comment = require("../models/comment");
const {connection} = require("../database");
const authenticateToken = require("../helpers/jwt");
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

router.post('/', authenticateToken, (req, res) => {
    const {product_id, comment, rating} = req.body;
    const user_id = req.user.id;
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

// like comment by id and user_id
router.post("/like/:id", authenticateToken, (req, res) => {
    const comment_id = req.params.id;
    const user_id = req.user.id;
    Comment.likeComment(connection, user_id, comment_id, (result) => {
        res.json(result);
    });
});

// dislike comment by id and user_id
router.post("/dislike/:id", authenticateToken, (req, res) => {
    const comment_id = req.params.id;
    const user_id = req.user.id;
    Comment.dislikeComment(connection, user_id, comment_id, (result) => {
        res.json(result);
    });
});

 // get total likes and dislikes by comment_id
    router.get("/total/:id", (req, res) => {
        const comment_id = req.params.id;
        Comment.getLikesDislikesByCommentId(connection, comment_id, (result) => {
            res.json(result);
        });
    }
);

// filter comments
router.post("/filter/:id", (req, res) => {
    const {sort_option} = req.body;
    const product_id = req.params.id;
    Comment.filterById(connection, product_id, sort_option, (result) => {
        res.json(result);
    });
});

// get endpoint to get total comments by product_id
router.get("/totalcomments/:id", (req, res) => {
    const product_id = req.params.id;
    Comment.getTotalCommentsByProductId(connection, product_id, (result) => {
        res.json(result);
    });
});

// POST endpoint to add a new adminReply by comment_id
router.post("/reply/:id", authenticateToken, (req, res) => {
    const comment_id = req.params.id;
    const {adminReply} = req.body;
    Comment.addAdminReply(connection, comment_id, adminReply, (result) => {
        res.json(result);
    });
});

// GET endpoint to get adminReply by comment_id
router.get("/reply/:id", (req, res) => {
    const comment_id = req.params.id;
    Comment.getAdminReplyByCommentId(connection, comment_id, (result) => {
        res.json(result);
    });
});

module.exports = router;