const express = require('express')
const categoriesController = require('../controllers/categoriesController')

const router = express.Router()

//read
router.get('/getAllCategories', categoriesController.getAllCategories)
//create
router.post('/addNewCategoryToStore', categoriesController.addNewCategoryToStore)
//delete
router.delete('/deleteStoreCategoryById/:id', categoriesController.deleteStoreCategoryById);

module.exports = router