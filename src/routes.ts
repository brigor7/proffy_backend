import express from 'express';
import db from './database/connection';

const routes = express.Router();

routes.post('/classes', async (req, res) => {
  const { name, avatar, wathsapp, bio, subject, cost, schedule } = req.body;
  try {
    await db('users').insert({
      name,
      avatar,
      wathsapp,
      bio,
    });
    return res.send();
  } catch (error) {
    console.error(error);
  }
});

//Exemplos

//GET: Buscar ou listar uma informação
//POST: Criar alguma nova informação
//PUT: Atualizar uma informação existente
//DELETE: Deletar uma informação existente

routes.get('/users', (_, res) => {
  const users = [
    { name: 'Bruno', sobrenome: 'Igor', idade: 40 },
    { name: 'Myrella', sobrenome: 'Pacheco', idade: 40 },
    { name: 'Valderez', sobrenome: 'Pacheco', idade: 72 },
  ];
  console.log('# Acessou a rota get');
  return res.json(users);
});

/**Parametro body - Corpo(Request body):Dados para criação ou atualização de um registro.
 * Ex: request.body.
 * # Acessou /users_body
 * { name: 'Jose', sobrenome: 'das Couves', idade: 33 } */
routes.post('/users_body', (req, res) => {
  const text = req.body;
  console.log('# Acessou /users_body');
  console.log(text);
  res.send(text);
});

/**Query Params: Recebendo um parametro passado na URL. Define-se o parametro no express e chama na URL
 * Ex: request.query. Na url: http://localhost:3333/users/1
 * # Acessou /users_param
 * {"id":"1"}*/
routes.delete('/users_param/:id', (req, res) => {
  const text = req.params;
  console.log('# Acessou /users_param');
  console.log(JSON.stringify(text));
  return res.send(text);
});

/**Route Params:Identificar  qual recurso a ser atualizado ou deletar.
 * Ex: param. Na url: http://localhost:3333/users/1
 * # Acessou /users_query
 * {"page":"2","sort":"asc"}*/
routes.get('/users_query', (req, res) => {
  const text = req.query;
  console.log('# Acessou /users_query');
  console.log(JSON.stringify(text));
  return res.send(text);
});

export default routes;
