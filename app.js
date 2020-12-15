const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const {connection} = require('./dbConfig')
const storeRoutes = require('./routes/storeRoute')
const categoriesRoute = require('./routes/categoriesRoute')
const productsRoute = require('./routes/productsRoute')
const fileUplaod = require('express-fileupload')

const app = express()
dotenv.config()

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }

    app.listen(process.env.PORT, () => console.log('app is running'))
})

app.use(fileUplaod({ createParentPath: true }))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/picture", async (req, res) => {
    try {
      if(!req.files){
        res.send({
          status: false,
          message: "No files"
        })
      } else {
        const {myFile} = req.files
        
        myFile.mv("./uploads/" + myFile.name)
  
        res.send({
          status: true,
          message: "File is uploaded",
          reference: myFile.name
        })
      }
    } catch (e) {
      res.status(500).send(e)
    }
  })

app.use(storeRoutes)
app.use(categoriesRoute)
app.use(productsRoute)

