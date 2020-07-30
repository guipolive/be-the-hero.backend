const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents').select('*').where('ong_id', ong_id); // guardando todos os incidents onde o ong_id do incidente = ong_id da ong logada

        return response.json(incidents);
    }
}