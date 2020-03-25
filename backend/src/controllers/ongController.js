const crypto = require('crypto');
const connection = require('../database/connection')

//Vai exportar um objeto com os métodos
module.exports = {

    //Listar
    async index(req, res) {
        const ongs = await connection('ongs').select('*')
        return res.json(ongs)
    },

    //Criar
    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body

        //Gerar um id aleatório de 4 bytes no formato hexadecimal
        const id = crypto.randomBytes(4).toString('HEX')
        console.log(req.body)
        //Inserir dados na tabela, recebe como primeiro parametro a tabela, depois o método e os dados
        //await -> aguarda o insert para depois continuar
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return res.json({ id })
    }
}