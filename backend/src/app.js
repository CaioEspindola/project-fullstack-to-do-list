/* eslint-disable linebreak-style */
const express = require('express')
const cors = require('cors')
const router = require('./router')

const app = express()

app.use(express.json())
app.use(cors())
/*Toda as requisições que acontecerem, passarão dentro do router*/
app.use(router)

module.exports = app
