const {DbConfig} = require('../dbConfig')

const getAllCategories =  (req, res) => {
    const db = DbConfig.getDbConfigInstance()
    
    const results = db.getAllCategories()

    results
    .then(result => res.json({data: result}))
    .catch(err => console.log(err))
}

const addNewCategoryToStore =  (req, res) => {
    const {store_id, name, image_reference} = req.body
    const db = DbConfig.getDbConfigInstance()
    
    const result = db.addNewCategoryToStore(store_id, name, image_reference)

    result
    .then(result => res.json({data: result}))
    .catch(err => console.log(err))
}

const deleteStoreCategoryById =  (req, res) => {
    const { id } = req.params;
    const db = DbConfig.getDbConfigInstance();

    const result = db.deleteStoreCategoryById(id);
    
    result
    .then(result => res.json({success : result}))
    .catch(err => console.log(err));
}

module.exports = {
    getAllCategories,
    addNewCategoryToStore,
    deleteStoreCategoryById,
}