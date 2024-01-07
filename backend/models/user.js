class User {
    constructor(UserId, name, email, password, isAdmin) {
        this.UserId = UserId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    // get all users
    static getAllUsers(connection, callback) {
        connection.query("SELECT UserId, name, email FROM users", (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    // get user by id
    static getUserById(connection, id, callback) {
        connection.query("SELECT UserId, name, email FROM users WHERE UserId = ?", [id], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    // add user
    static addUser(connection, name, email, password, callback) {
        //get max UserId
        connection.query("SELECT MAX(UserId) AS maxUserId FROM users", (err, result) => {
            if (err) throw err;
            const maxUserId = result[0].maxUserId;
            const newUserId = maxUserId + 1;
            
            connection.query("INSERT INTO users (UserId, name, email, password) VALUES (?,?,?,?)", 
                [newUserId, name, email, password], (err, result) => {
                if (err) throw err;
                callback(result);
            });
        });
    }

    // delete user by id
    static deleteUserById(connection, id, callback) {
        connection.query("DELETE FROM users WHERE UserId = ?", [id], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    // update user by id
    static updateUserById(connection, id, name, email, password, callback) {
        connection.query("UPDATE users SET name = ?, email = ?, password = ? WHERE UserId = ?", 
        [name, email, password, id], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    // login
    static login(connection, email, callback) {
        connection.query("SELECT * FROM users WHERE email = ?", 
        [email], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    };

    // get user count
    static getUserCount(connection, callback) {
        connection.query("SELECT COUNT(*) AS userCount FROM users", (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }
}

module.exports = {User};