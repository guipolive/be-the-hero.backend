const express = require('express');// usaremos para tratar caminhos, rotas, url, etc
const {celebrate, Segments, Joi} = require('celebrate'); // usaremos o celebrate para fazer a validação dos nossos dados

const connection = require('./database/connection'); // importando a conexão com o banco de dados
const routes = express.Router(); // modularizando nossas rotas para podermos exportá-las

const OngController = require('./controllers/OngController'); // importando nossa controller de Ongs
const IncidentController = require('./controllers/IncidentController'); // importando nossa controller de Incidents
const ProfileController = require('./controllers/ProfileController'); // importando nossa controller de Profile
const SessionsController = require('./controllers/SessionController'); // importando nossa controller de Sessões

// rota usada para listar as ongs inseridas
routes.get('/ongs', OngController.list); // usando o método list da controller OngController para agir na rota /ongs com método get

// rota usada para inserir uma nova ong
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create); // usando o método create da controller OngController para a gir na rota /ongs com método post


routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().required()
    })
}), IncidentController.list);

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().max(120),
        description: Joi.string().required().max(4000),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.list);

routes.post('/sessions', SessionsController.create);

module.exports = routes; // Exportando routes para que nosso app.js possa ter acesso