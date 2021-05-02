const express = require('express')
const path = require('path')

require('dotenv').config({path: './.env'})
const createCheckoutSession = require('./API/checkout')

const publicDirectoryPath = path.join(__dirname, '../../public')


const port = process.env.PORT
const app = express()

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.post('/create-checkout-session', createCheckoutSession)

app.listen(port, ()=> {
    console.log('server is listening on port '+port)
})