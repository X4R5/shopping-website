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
        connection.query("SELECT * FROM comments WHERE product_id = ?", [product_id], (err, result) => {
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
}

module.exports = Comment;