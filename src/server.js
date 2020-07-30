const app = require('./app');

// Nossa aplicação estará disponível na porta 3333 caso não ache uma variável de ambiente PORT
app.listen(process.env.PORT || 3333); 