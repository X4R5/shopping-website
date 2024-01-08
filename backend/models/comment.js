const { query } = require("express");

class Comment{
    // comment_id product_id user_id comment rating
    constructor(comment_id, product_id, user_id, comment, rating){
        this.comment_id = comment_id;
        this.product_id = product_id;
        this.user_id = user_id;
        this.comment = comment;
        this.rating = rating;
    }

    // get all comments
    static getAllComments(connection, callback){
        connection.query("SELECT * FROM comments", (err, result) => {
            if(err) throw err;
            callback(result);
        });
    }

    // all comments by product_id
   
    static getCommentsByProductId(connection, product_id, callback){
        const query = `
            SELECT comments.*, users.name
            FROM comments
            JOIN users ON comments.user_id = users.UserId
            WHERE comments.product_id = ?
        `;
    
        connection.query(query, [product_id], (err, result) => {
            if(err) throw err;
            callback(result);
        });
    }
    
    
    

    // comment by comment_id
    static getCommentByCommentId(connection, comment_id, callback){
        connection.query("SELECT * FROM comments WHERE comment_id = ?", [comment_id], (err, result) => {
            if(err) throw err;
            callback(result);
        });
    }

    // add comment
    static addComment(connection, product_id, user_id, comment, rating, callback){
        // get max id
        connection.query("SELECT MAX(comment_id) AS maxCommentId FROM comments", (err, result) => {
            if(err) throw err;
            const maxCommentId = result[0].maxCommentId;
            const newCommentId = maxCommentId + 1;

            connection.query(`INSERT INTO comments (comment_id, product_id, user_id, comment, rating) 
                VALUES (?,?,?,?,?)`, [newCommentId, product_id, user_id, comment, rating], (err, result) => {
                if(err) throw err;
                callback(result);
            });
        });
    }

    // update comment
    static updateCommand(connection, comment_id, comment, rating, callback){
        connection.query("UPDATE comments SET comment = ?, rating = ? WHERE comment_id = ?", 
            [comment, rating, comment_id], (err, result) => {
            if(err) throw err;
            callback(result);
        });
    }

    // delete comment
    static deleteComment(connection, comment_id, callback){
        connection.query("DELETE FROM comments WHERE comment_id = ?", [comment_id], (err, result) => {
            if(err) throw err;
            callback(result);
        });
    }

    // get average rating by product_id
    static getAverageRatingByProductId(connection, product_id, callback){
        connection.query("SELECT AVG(rating) AS averageRating FROM comments WHERE product_id = ?", 
            [product_id], (err, result) => {
            if(err) throw err;
            callback(result);
        });
    }

  // Like comment by id and user_id
static likeComment(connection, user_id, comment_id, callback) {
    connection.query("SELECT * FROM likes WHERE userId = ? AND commentId = ?", 
        [user_id, comment_id], (err, likeRows) => {
        if (err) throw err;

        // Delete existing like if it exists
        if (likeRows.length > 0) {
            connection.query("DELETE FROM likes WHERE userId = ? AND commentId = ?", 
                [user_id, comment_id], (err, result) => {
                if (err) throw err;
                callback(result);
            });
        } else {
            // Check if user disliked the comment, delete the dislike
            connection.query("DELETE FROM dislikes WHERE userId = ? AND commentId = ?", 
                [user_id, comment_id], (err, result) => {
                if (err) throw err;

                // Add like after deleting the dislike
                connection.query("INSERT INTO likes (userId, commentId) VALUES (?,?)", 
                    [user_id, comment_id], (err, result) => {
                    if (err) throw err;
                    callback(result);
                });
            });
        }
    });
}

// Dislike comment by id and user_id
static dislikeComment(connection, user_id, comment_id, callback) {
    connection.query("SELECT * FROM dislikes WHERE userId = ? AND commentId = ?", 
        [user_id, comment_id], (err, dislikeRows) => {
        if (err) throw err;

        // Delete existing dislike if it exists
        if (dislikeRows.length > 0) {
            connection.query("DELETE FROM dislikes WHERE userId = ? AND commentId = ?", 
                [user_id, comment_id], (err, result) => {
                if (err) throw err;
                callback(result);
            });
        } else {
            // Check if user liked the comment, delete the like
            connection.query("DELETE FROM likes WHERE userId = ? AND commentId = ?", 
                [user_id, comment_id], (err, result) => {
                if (err) throw err;

                // Add dislike after deleting the like
                connection.query("INSERT INTO dislikes (userId, commentId) VALUES (?,?)", 
                    [user_id, comment_id], (err, result) => {
                    if (err) throw err;
                    callback(result);
                });
            });
        }
    });
}

// get total like and dislike by comment_id
static getLikesDislikesByCommentId(connection, comment_id, callback){
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM likes WHERE commentId = ?) AS likes,
            (SELECT COUNT(*) FROM dislikes WHERE commentId = ?) AS dislikes
    `;

    connection.query(query, [comment_id, comment_id], (err, result) => {
        if(err) throw err;
        callback(result);
    });

}

// filter comments
static filterById(connection, product_id, sort_option, callback) {
    let orderByClause;

    switch (sort_option) {
        case 'like_desc':
            orderByClause = 'ORDER BY like_count DESC';
            break;
        case 'like_ascend':
            orderByClause = 'ORDER BY like_count ASC';
            break;
        case 'dislike_desc':
            orderByClause = 'ORDER BY dislike_count DESC';
            break;
        case 'dislike_ascend':
            orderByClause = 'ORDER BY dislike_count ASC';
            break;
        case 'rating_desc':
            orderByClause = 'ORDER BY rating DESC';
            break;
        case 'rating_ascend':
            orderByClause = 'ORDER BY rating ASC';
            break;
        default:
            orderByClause = ''; // Default sorting order
    }

    const query = `
        SELECT c.comment_id, 
               COUNT(l.id) AS like_count,
               COUNT(d.id) AS dislike_count,
               AVG(c.rating) AS rating
        FROM comments c
        LEFT JOIN likes l ON c.comment_id = l.commentId
        LEFT JOIN dislikes d ON c.comment_id = d.commentId
        WHERE c.product_id = ?
        GROUP BY c.comment_id
        ${orderByClause};
    `;

    connection.query(query, [product_id], (err, result) => {
        if (err) throw err;
        callback(result);
    });
}


    
    }

module.exports = Comment;