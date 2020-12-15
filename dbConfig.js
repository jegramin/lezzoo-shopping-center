const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

let instance = null

class DbConfig {
    static getDbConfigInstance() {
        return instance ? instance : new DbConfig();
    }
    //stores
    async getAllStores() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM stores;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    
                    results = results.map(result => {
                        return {id: result.id, name: result.name, logo_reference: `file://${__dirname}/uploads/${result.logo_reference}`}
                    })
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async addNewStore(name, logo_reference) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO stores (name, logo_reference) VALUES (?,?);";

                connection.query(query, [name, logo_reference] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });

            return {
                id: insertId,
                name,
                logo_reference,
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteStoreById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM stores WHERE id = ?;";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //categories
    async addNewCategoryToStore(store_id, name, logo_reference) {
        try {
            store_id = parseInt(store_id)
            
            const insertId = await new Promise((resolve, reject) => {
                const query = `INSERT INTO categories (name, image_reference) VALUES (?, ?)`;

                connection.query(query, [name, logo_reference] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            const store = await new Promise((resolve, reject) => {
                const query = `INSERT INTO stores_categories (store_id, category_id) VALUES (?, ?)`;

                connection.query(query, [store_id, insertId] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            // const store = await new Promise((resolve, reject) => {
            //     const query = `INSERT INTO stores_categories (store_id, category_id) VALUES (?, ?)`;

            //     connection.query(query, [store_id, insertId] , (err, result) => {
            //         if (err) reject(new Error(err.message));
            //         resolve(result.insertId);
            //     })
            // });

            return {
                id: insertId,
                name,
                logo_reference,
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteStoreCategoryById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM products WHERE id = ?;";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getAllCategories() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `
                    SELECT categories.id AS id, categories.name, categories.image_reference, stores.id AS store_id FROM categories 
                    INNER JOIN stores_categories ON categories.id = stores_categories.category_id
                    INNER JOIN stores ON stores.id = stores_categories.store_id;
                `

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    results = results.map(result => {
                        return {id: result.id, name: result.name, image_reference: `file://C:${__filename}/uploads/${result.image_reference}`,
                                 store_id: result.store_id}
                    })
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    //products
    async getAllProducts() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `
                    SELECT products.id AS id, products.name AS product_name, products.price AS price, categories.name AS category_name,
                    stores.name AS store_name, products.store_id AS store_id, products.category_id AS category_id FROM products
                    INNER JOIN stores ON stores.id = products.store_id
                    INNER JOIN categories ON categories.id = products.category_id
                `;

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));

                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async addNewProduct(name, price, store_id, category_id, image_reference) {
        price = parseInt(price)
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = `INSERT INTO products (name, price, store_id, category_id, image_reference) VALUES (?, ?, ?, ?, ?);`;

                connection.query(query, [name, price, store_id, category_id, image_reference] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });

            return {
                id: insertId,
                name,
                price,
                store_id,
                category_id,
                image_reference,
            };
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    DbConfig,
    connection,
}