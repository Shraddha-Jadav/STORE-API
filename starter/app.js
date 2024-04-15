require('dotenv').config()
require('express-async-errors')

const express = require('express');
const app = express();

const connectDB = require('./db/connect')
const products = require('./routes/products')

// async errors
const errorMiddleware = require('./middleware/error-handler')
const notfoundMiddleware = require('./middleware/not-found')

// middleware 
app.use(express.static('./public'))
app.use(express.json())

// routes
// app.get('/', (req, res) => {
//     res.send('<h1>Store API</h1><a href="/api/v1/products">products</a>')
// })

app.use('/api/v1/products', products)

// products routes
app.use(notfoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listing on port no ${port}....`))
    } catch (error) {
        console.log(error)
    }
}

start()