const connection = require('../database/connection')

module.exports = {
    async index(req, res){

        //Paginação, caso não exista pega o valor 
        const { page = 1 } = req.query;

        //Total de registros
        //Pode retornar um array, usamos o colchetes e pegamos a primeira posição
        const [count] = await connection('incidents').count()
        

        //Enviar o total no cabeçalho da requisição, passamos entre colchetes e acessamos a chave
        //que retornou count(*)
        res.header('X-Total-Count', count['count(*)'])

        
        
        //a multiplicação por 5 
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //Relacionamento com join
            .limit(5) //limita a 5 registros
            .offset((page - 1) * 5) //pula de 5 em 5 registros, caso for 1, diminui o valor de 1 
            .select(
                ['incidents.*',
                 'ongs.name',
                 'ongs.email',
                 'ongs.whatsapp',
                 'ongs.city',
                  'ongs.uf']
            )
        return res.json(incidents)
    },

    async create(req, res){
        const { title, description, value } = req.body;

        //id da ong que cadastrou o caso
        const ong_id = req.headers.authorization

        //Irá retornar um array com uma unica posição pois é uma inserção de um unico registro. Usando
        //desestruturação grava o valor na posição 0 na variavel id
        const [id] = await connection('incidents').insert({
            title,
            description, 
            value,
            ong_id   
        })

        return res.json({ id })

    },

    async delete(req, res) {
        
        //Id do incident que queremos deletar, Chega como route params
        const { id } = req.params;

        //"Token"
        const ong_id = req.headers.authorization
        console.log(ong_id);

        //Select com where, busca um incident cadastrado pelo parametro
        //Caso o ong_id seja diferente da ong que quer excluir, iremos vetar
        //Uma ong só pode excluir o caso que ela cadastrou

        //Irá retornar só um caso, podemos usar o método first. Incident que queremos deletar filtrado com 
        //id que veio por parametro 
        const incident = await connection('incidents').where('id', id).select('ong_id').first()
      

        if(incident.ong_id != ong_id){
            //status não autorizado
            return res.status(401).json({ error:"Operação Não Autorizada!" })
        }
        
        //Deleta a incident
        await connection('incidents').where('id', id).delete()
        
        //Quando retornamos uma resposta1(que deu sucesso) sem conteúdo
        res.status(204).send()
    }
}