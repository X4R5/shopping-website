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
    static addOrder(connection, ProductList, userId, address, deliveryOption, paymentMethod, callback){
        // get max id
        connection.query("SELECT MAX(id) AS maxOrderId FROM orders", (err, result) => {
            if(err) throw err;
            const maxOrderId = result[0].maxOrderId;
            const newOrderId = maxOrderId + 1;
            const date = new Date();
            const OrderDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            connection.query(`INSERT INTO orders (id, UserId, date, address, deliveryOption, paymentMethod) 
                VALUES (?,?,?,?,?,?)`, [newOrderId, userId, OrderDate, address, deliveryOption, paymentMethod], (err, result) => {
                if(err) throw err;
                callback(result);
            });

            // add order items
            ProductList.forEach(product => {
                connection.query(`INSERT INTO orderdetails (orderId, productId, quantity) 
                    VALUES (?,?,?)`, [newOrderId, product.productId, product.quantity], (err, result) => {
                    if(err) throw err;
                });
            });
        });
    }
        



    // add order to orders and order_items
    // static addOrder(connection, UserId, OrderDate, ProductList, callback){
    //     // get max id
    //     connection.query("SELECT MAX(orderId) AS maxOrderId FROM orders", (err, result) => {
    //         if(err) throw err;
    //         const maxOrderId = result[0].maxOrderId;
    //         const newOrderId = maxOrderId + 1;

    //         connection.query(`INSERT INTO orders (orderId, UserId, OrderDate) 
    //             VALUES (?,?,?)`, [newOrderId, UserId, OrderDate], (err, result) => {
    //             if(err) throw err;
    //             callback(result);
    //         });

    //         // add order items
    //         ProductList.forEach(product => {
    //             // check for stock
    //             connection.query("SELECT product_stock FROM products WHERE product_id = ?", [product.productId], (err, result) => {
    //                 if(err) throw err;
    //                 const stock = result[0].product_stock;
    //                 if(stock < product.quantity){
    //                     throw new Error("Not enough stock!");
    //                 }
    //             });
    //             connection.query(`INSERT INTO orderdetails (orderId, productId, quantity) 
    //                 VALUES (?,?,?)`, [newOrderId, product.productId, product.quantity], (err, result) => {
    //                 if(err) throw err;
    //                 // stock update
    //                 connection.query(`UPDATE products SET product_stock = product_stock - ? 
    //                     WHERE product_id = ?`, [product.quantity, product.productId], (err, result) => {
    //                     if(err) throw err;
    //                     // callback(result);
    //                 });
    //             });
    //         });
    //     });
    // }
    
}

module.exports = Order;