// express web server
const express = require('express');
const mongodb = require('./data/database');
const app = express();

app.use('/', require('./routes/index'));

const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening, and the node is running on port ${port}`);
    });
  }
});
