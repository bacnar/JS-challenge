const express = require('express');
const morgan = require('morgan');
const routes = require('./src/routes/index');

const app = express();

app.use(morgan('tiny'));
app.use('/api', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Starting server at: http://localhost:${port}`);
});
