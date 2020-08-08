import express from 'express';

const app = express();
app.use(express.json());

//GET: Buscar ou listar uma informação
//POST: Criar alguma nova informação
//PUT: Atualizar uma informação existente
//DELETE: Deletar uma informação existente

//Tipos de parametros

//Setando a porta
app.listen(3333);
//Recebendo o retorno em formato JSON

app.get('/users', (_, res) => {
  const users = [
    { name: 'Bruno', sobrenome: 'Igor', idade: 40 },
    { name: 'Myrella', sobrenome: 'Pacheco', idade: 40 },
    { name: 'Valderez', sobrenome: 'Pacheco', idade: 72 },
  ];
  console.log('# Acessou a rota get');
  return res.json(users);
});

//Parametro body - Corpo(Request body):Dados para criação ou atualização de um registro. Ex: request.body.
app.post('/users_body', (req, res) => {
  const text = req.body;
  console.log('# Acessou /users_body');
  console.log(text);
  res.send(text);
});

//Query Params: Usado para Paginação, filtros, ordenação. Ex: request.query. Na url: http://localhost:3333/users?&page=2&sort=asc
app.post('/users_param/:id', (req, res) => {
  const text = req.params;
  console.log('# Acessou /users_param');
  console.log(JSON.stringify(text));
  return res.send(text);
});

//Route Params:Identificar  qual recurso a ser atualizado ou deletar. Ex: param. Na url: http://localhost:3333/users/1
app.post('/users_query', (req, res) => {
  const text = req.query;
  console.log('# Acessou /users_query');
  console.log(JSON.stringify(text));
  return res.send(text);
});
