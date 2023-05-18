/* eslint-disable linebreak-style */
const app = require('./app')
/* Método para poder utilizar as variáveis do ambiente .env*/
require('dotenv').config()

const PORT = process.env.PORT || 3306

app.listen(PORT, () => console.log(`servidor esta rodando na porta ${PORT}`))
