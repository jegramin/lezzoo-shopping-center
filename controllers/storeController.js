const {DbConfig} = require('../dbConfig')

const getAllStores =  (req, res) => {
    const db = DbConfig.getDbConfigInstance()

    const results = db.getAllStores()

    results
    .then(result => res.json({data: result}))
    .catch(err => console.log(err))
}

const addNewStore =  (req, res) => {
    const {name, logo_reference} = req.body
    const db = DbConfig.getDbConfigInstance()

    const result = db.addNewStore(name, logo_reference)

    result
    .then(result => res.json({data: result}))
    .catch(err => console.log(err))
}

const deleteStoreById =  (req, res) => {
    const { id } = req.params;
    const db = DbConfig.getDbConfigInstance();

    const result = db.deleteStoreById(id);
    
    result
    .then(result => res.json({success : result}))
    .catch(err => console.log(err));
}

module.exports = {
    getAllStores,
    addNewStore,
    deleteStoreById,
}