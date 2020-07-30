// para importar algo para dentro de nossa aplicação
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const {errors} = require('celebrate'); // tratamento de erros vindos da validação com o celebrate, feita nas rotas
const app = express();

// NECESSÁRIO PARA CONSEGUIR SE CONECTAR COM O FRONTEND
app.use(cors()); // Permite o uso o módulo Cors. Por enquanto não usaremos porque está somente em desenvolvimento nossa aplicação.
app.use(express.json()); // informa ao nosso app que estaremos usando json para as requisições, então o app agora passa a converter os textos json em objeto de javascript
app.use(routes);
app.use(errors()); // nos ajuda a tratar o erro de uma forma melhor para o frontend

module.exports = app;