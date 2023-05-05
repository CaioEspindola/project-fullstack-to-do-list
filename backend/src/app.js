/* eslint-disable linebreak-style */
const express = require('express')
const router = require('./router')

const app = express()

/*Toda as requisições que acontecerem, passarão dentro do router*/
app.use(router)

module.exports = app
