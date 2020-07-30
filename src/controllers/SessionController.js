const connection = require('../database/connection'); // Conexão com o banco

module.exports = {
    async create(request, response) {
        const {id} = request.body; // pegando o id da nossa ong a partir do body da requisição. Dessa forma pegamos somente o campo em que o nome for {id}

        const ong = await connection('ongs').select('name').where('id', id).first();

        if (!ong)
            return response.status(400).json({error: 'No ONG found with this ID.'}); // Retorna o erro 400 'Bad Request' caso nenhuma ong com o id desejado seja encontrada

        return response.json(ong);
    }
}