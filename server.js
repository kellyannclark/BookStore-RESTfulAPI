//express web server
const express = require('express');
const mongodb = require('./data/database');
const app = express();

app.use('/', require('./routes/index'));

const port = 3000;

app.listen(process.env.port || port);
console.log("Web server is listening at port" + (process.env.port || port));

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port, () => {
        console.log(`Database is listening, and the node is running on port ${port}`);
      });
    }
  });