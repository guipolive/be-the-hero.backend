const connection = require('../database/connection'); // importando a conexão com o banco de dados
const generateUniqueId = require('../utils/generateUniqueId'); // importando nossa função de gerar id's

module.exports = {
    async create(request, response) {
        //const data = request.body; // dessa forma teríamos tudo o que voltasse do frontend, podendo conter informações desnecessárias
        const data = {name, email, whatsapp, city, uf} = request.body; // assim podemos garantir que só teremos as informações necessárias

        const id = generateUniqueId(); // nosso id será igual a 4 bytes de caracteres aleatórios convertidos para HEXADECIMAL

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        }) // esse trecho de código pode demorar a ser finalizado. Por isso faremos uso da propriedade async await, para que o node aguarde esse trecho ser finalizado para prosseguir

        console.log(data);

        return response.json({id});
    },

    async list(request, response) {
        const ongs = await connection('ongs').select('*'); // como essa conexão pode demorar, usamos a propriedade async await

        return response.json(ongs);
    }
}