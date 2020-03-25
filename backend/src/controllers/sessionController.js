//Controller para controlar o login e logout
const connection = require('../database/connection')

//Iremos verificar se a ong que está "logando", já está cadastrada
module.exports = {
    async create(req, res) {
        const { id } = req.body;

        const ong = await connection('ongs').where('id', id).select('name').first()

        if(!ong){
            return res.status(400).json({ error:"No ONG found with this ID" })
        }

        return res.json(ong)
        
    }
}