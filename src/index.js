const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({
    event: 'Semana OmniStack 11',
    student: 'Rômulo Maciel'
  });
});

app.listen(3333);