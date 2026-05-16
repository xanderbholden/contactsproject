require('dotenv').config();

const express = require('express');
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', require('./routes'));

app.get('/', (req, res) => {
  res.send('Server is working');
});

mongodb.initDb((err) => {
  if (err) {
    console.log('Database connection failed');
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});