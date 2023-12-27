class Product {
    constructor(product_id, category_id, product_image, product_name, product_price, product_stock, 
        product_desc) {
        this.product_id = product_id;
        this.category_id = category_id;
        this.product_image = product_image;
        this.product_name = product_name;
        this.product_price = product_price;
        this.product_stock = product_stock;
        this.product_desc = product_desc;
    }

    // get all products
    static getAllProducts(connection, callback) {
        connection.query("SELECT * FROM products", (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    // get product by id
    static getProductById(connection, id, callback) {
        connection.query("SELECT * FROM products WHERE product_id = ?", [id], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    // add product
    static addProduct(connection, category_id, product_image, product_name, product_price, product_stock, 
        product_desc, callback) {
        //get max product_id
        connection.query("SELECT MAX(product_id) AS maxProductId FROM products", (err, result) => {
            if (err) throw err;
            const maxProductId = result[0].maxProductId;
            const newProductId = maxProductId + 1;
            
            connection.query(`INSERT INTO products (product_id, category_id, product_image, product_name, 
                product_price, product_stock, product_desc) VALUES (?,?,?,?,?,?,?)`, 
                [newProductId, category_id, product_image, product_name, product_price, product_stock, 
                    product_desc], (err, result) => {
                if (err) throw err;
                callback(result);
            });
        });
    }

    // delete product by id
    static deleteProductById(connection, id, callback) {
        connection.query("DELETE FROM products WHERE product_id = ?", [id], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    // update product by id
    static updateProductById(connection, id, category_id, product_image, product_name, product_price, 
        product_stock, product_desc, callback) {
        connection.query("UPDATE products SET category_id = ?, product_image = ?, product_name = ?, " +
            "product_price = ?, product_stock = ?, product_desc = ? WHERE product_id = ?", 
            [category_id, product_image, product_name, product_price, product_stock, product_desc, id], 
            (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }
}

module.exports = Product;