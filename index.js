const express = require('express');
const morgan = require('morgan');
const routes = require('./src/routes/index');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(morgan('tiny'));
app.use('/api', routes);

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/**/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Starting server at: http://localhost:${port}`);
});
