const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const data = {title, description, value} = request.body;

        // Como o id da nossa ong vai depender de qual ong está logada no sistema na hora da inserção, devemos pegar o id dela da sessão. Ele estará armazenado em
            //request.headers.authorization;
        const ong_id = request.headers.authorization; 

        // Como o id do nosso incident é incremental (definido na tabela como autoIncrement), ele será gerado automaticamente
        // ao inserir um dado na tabela incidents, essa inserção nos retornará nesse caso o id do incident
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        console.log(data);

        return response.json({id}); // retornando o id do incident criado para que o frontend tenha acesso a ele, para exibir informações, por exemplo
    },

    async list(request, response) {
        const {page = 1} = request.query; // guarda a página enviada pela query params (ex.: meusite.com/usuarios:page=2). Por padrão guarda 1
        
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5); // Mostra somente 5 incidents por página.

        response.header('X-Total-Count', count['count(*)']); // envia por meio do header o total de linhas da consulta, para exibição no frontend

        return response.json(incidents);
    },

    async delete(request, response) {
        const {id} = request.params; // Dessa forma pegamos o id enviado por parâmetro da forma meusite.com/incidents/(idNum)
        const ong_id = request.headers.authorization; // pegamos o ong_id aqui para comparar se realmente a ong logada é a criadora do incident que ela quer deletar

        const incident = await connection('incidents').where('id', id).select('ong_id').first(); // pegando o ong_id do nosso incident (conhecido pelo id recebido por parâmetro na url)

        // verificando se o ong_id do nosso incident é igual ao ong_id da ong logada. Se for diferente, retorna um erro de autorização
        if (incident.ong_id !== ong_id) {
            return response.status(401).json({error: 'Operation not permited. '}); //http status code 401: erro de autorização. Unauthorized
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); // http status code 204: resposta sem conteúdo, mas com sucesso.
    }
}