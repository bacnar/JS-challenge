const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Starting server at: http://localhost:${port}`);
});
