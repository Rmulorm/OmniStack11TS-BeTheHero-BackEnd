const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => {
  console.log('get /');

  return response.json({
    event: 'Semana OmniStack 11',
    student: 'Rômulo Maciel'
  });
});

module.exports = routes;