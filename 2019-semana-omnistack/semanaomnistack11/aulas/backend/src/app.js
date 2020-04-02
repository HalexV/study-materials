const express = require('express'); //contém todas as funcionalidades da ferramenta express.
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express(); //criando a aplicação.

app.use(cors());
app.use(express.json());//converte o request body de json para um objeto javascript.


/**
 * Rota / Recursos (entidade, tabela no banco de dados)
 */

 /**
  * Métodos HTTP:
  * 
  * GET: vamos usar quando queremos buscar uma informação do back-end.
  * 
  * POST: Criar uma informação no back-end
  * PUT: Alterar uma informação no back-end
  * DELETE: Deletar uma informação no back-end
  */

  /**
   * Tipos de parâmetros:
   * 
   * Query Params: Parâmetros nomeados enviados na rota após "?". Usado em filtros, paginação. request.query.
   * 
   * Route Params: Parâmetros utilizados para identificar recursos. /users/:id. /users/1. request.params.
   * 
   * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos. request.body.
   */

   /**
    * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server.
    * NoSQL: MongoDB, CouchDB, etc.
    */

    /**
     * Driver: SELECT * FROM users.
     * Query Builder: table('users').select('*').where().
     * 
     */

app.use(routes);
app.use(errors());

module.exports = app;