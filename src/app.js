const express = require('express')

const productsRouter = require('./routes/productController')
const ordersRouter = require('./routes/orderController')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/products', productsRouter)
app.use('/orders', ordersRouter)


app.all('*', function (req, res) {
    res.status(404).json({
        error: `route ${req.url} not found`,
    })
})

module.exports = app
