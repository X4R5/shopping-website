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
        connection.query("SELECT * FROM orders WHERE id = ?", [orderId], (err, result) => {
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
            connection.query(`INSERT INTO orders (id, userId, date, address, deliveryOption, paymentMethod) 
                VALUES (?,?,?,?,?,?)`, [newOrderId, userId, OrderDate, address, deliveryOption, paymentMethod], (err, result) => {
                if(err) throw err;
                callback(result);
            });

            // add order items
            ProductList.forEach(product => {
                connection.query(`INSERT INTO orderdetails (orderId, productId, quantity) 
                    VALUES (?,?,?)`, [newOrderId, product.product_id, product.quantity], (err, result) => {
                    if(err) throw err;
                });
            });
        });
    }
        
    // get orders by userid and orderdetails by orderid
    static getOrderDetailsByOrderId(connection, userId, callback) {
        const query = `
            SELECT orders.id, orders.userId, orders.paymentMethod, orders.deliveryOption, orders.address, orders.date, orders.id,
                   orders.status,
                   GROUP_CONCAT(DISTINCT orderdetails.productId) as productIds,
                   GROUP_CONCAT(orderdetails.quantity) as quantities
            FROM orders
            INNER JOIN orderdetails ON orders.id = orderdetails.orderId
            WHERE orders.userId = ?
            GROUP BY orders.id, orders.userId, orders.paymentMethod, orders.deliveryOption, orders.address, orders.date, orders.id, orders.status
        `;
    
    
        connection.query(query, [userId], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }
    
    // check for coupon code and return discount
    static checkCoupon(connection, couponCode, callback){
        connection.query("SELECT * FROM coupons WHERE couponCode = ?", [couponCode], (err, result) => {
            if(err) throw err;
            callback(result);
        });
    }

    // update order status if isAdmin
    static updateOrderStatus(connection, orderId, status, callback){
        connection.query("UPDATE orders SET status = ? WHERE id = ?", [status, orderId], (err, result) => {
            if(err) throw err;
            callback(result);
        });
    }
    


}

module.exports = Order;