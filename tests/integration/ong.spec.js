const request = require('supertest'); // supertest é uma biblioteca própria para testes. Ela nos permite fazer chamadas ao backend utilizando as rotas esperadas, como o axios, mas próprio para testes.
const app = require('../../src/app');
const connection = require('../../src/database/connection'); // conexão com o banco de dados

describe('ONG', () => {

    beforeEach(async () => {
        await connection.migrate.rollback(); // zerando o banco de dados (de testes) para não popular desnecessariamente, e também para não ter conflito com outro teste que possa executar.
        await connection.migrate.latest();
    })

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "Meu Peludo",
            email: "contato@meupeludo.com",
            whatsapp: "61994187318",
            city: "Natal",
            uf: "RN"
        })

        // console.log(response.body);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
})