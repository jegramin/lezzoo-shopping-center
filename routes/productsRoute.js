const express = require('express')
const productsController = require('../controllers/productsController')

const router = express.Router()

//read
router.get('/getAllProducts', productsController.getAllProducts)
//create
router.post('/addNewProduct', productsController.addNewProduct)
//delete
router.delete('/deleteProductById/:id', productsController.deleteProductById)

module.exports = router