require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Contacts API is running');
});

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log('Database connection failed');
    console.error(err);
  } else {
    console.log('Connected to MongoDB');
  }
});