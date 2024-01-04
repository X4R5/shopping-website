class Order{
    // constructor orderId UserId OrderDate ProductId Quantity
    constructor(orderId, UserId, OrderDate, ProductList) {
        this.orderId = orderId;
        this.UserId = UserId;
        this.OrderDate = OrderDate;
        this.ProductList = ProductList;
    }

    // get all orders
    static getAllOrders(connection, callback){
        connection.query("SELECT * FROM orders", (err, result) => {
            if(err) throw err;
            callback(result);
        });
    }

    // get order by orderId
    static getOrderByOrderId(connection, orderId, callback){
        connection.query("SELECT * FROM orders WHERE orderId = ?", [orderId], (err, result) => {
            if(err) throw err;
            callback(result);
        });
    }

    // add order to orders and order_items
    static addOrder(connection, UserId, OrderDate, ProductList, callback){
        // get max id
        connection.query("SELECT MAX(orderId) AS maxOrderId FROM orders", (err, result) => {
            if(err) throw err;
            const maxOrderId = result[0].maxOrderId;
            const newOrderId = maxOrderId + 1;

            connection.query(`INSERT INTO orders (orderId, UserId, OrderDate) 
                VALUES (?,?,?)`, [newOrderId, UserId, OrderDate], (err, result) => {
                if(err) throw err;
                callback(result);
            });

            // add order items
            ProductList.forEach(product => {
                connection.query(`INSERT INTO orderdetails (orderId, productId, quantity) 
                    VALUES (?,?,?)`, [newOrderId, product.productId, product.quantity], (err, result) => {
                    if(err) throw err;
                    // callback(result);
                });
            });
        });
    }
    
}

module.exports = Order;