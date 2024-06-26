const express = require('express');
const morgan = require('morgan');
const routes = require('./src/routes/index');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const requestCounter = require('./src/middleware/requestCounter');

const app = express();

app.use(morgan('tiny'));
app.use('/api', express.json(), requestCounter, routes);

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JS-Challange',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/**/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Starting server at: http://localhost:${port}`);
  console.log(`Docs at: http://localhost:${port}/docs`);
});
