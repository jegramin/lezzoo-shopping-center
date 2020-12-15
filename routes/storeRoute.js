const express = require('express')
const storeController = require('../controllers/storeController')

const router = express.Router()

//read
router.get('/getAllStores', storeController.getAllStores)
//create
router.post('/addNewStore', storeController.addNewStore)
//delete
router.delete('/deleteStoreById/:id', storeController.deleteStoreById);

module.exports = router