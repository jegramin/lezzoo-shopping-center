const {DbConfig} = require('../dbConfig')

const getAllProducts =  (req, res) => {
    const db = DbConfig.getDbConfigInstance()

    const results = db.getAllProducts()

    results
    .then(result => res.json({data: result}))
    .catch(err => console.log(err))
}

const addNewProduct =  (req, res) => {
    const {name, price, image_reference, store_id, category_id} = req.body
    const db = DbConfig.getDbConfigInstance()

    const result = db.addNewProduct(name, price, store_id, category_id, image_reference)

    result
    .then(result => res.json({data: result}))
    .catch(err => console.log(err))
}

const deleteProductById =  (req, res) => {
    const { id } = req.params;
    const db = DbConfig.getDbConfigInstance();

    const result = db.deleteProductById(id);
    
    result
    .then(result => res.json({success : result}))
    .catch(err => console.log(err));
}

module.exports = {
    getAllProducts,
    addNewProduct,
    deleteProductById,
}