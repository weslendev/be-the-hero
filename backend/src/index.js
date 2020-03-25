const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')

app.use(cors())

/** 
caso for em produção
---------------------
app.use(cors({
    origin: "http://www.seudominio.com.br"
}))
**/

//Informa para o express que as requisições irão vir em formato json
app.use(express.json())

app.use(routes)

app.listen(3333);