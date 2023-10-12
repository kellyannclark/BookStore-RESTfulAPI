//express web server
const express = require('express');
const app = express();

app.get('/', (req, res) => { //if it gets a request for /, respond hello
    res.send('Hello Kelly')
});

const port = 3000;

app.listen(process.env.port || port);
console.log("Web server is listening at port" + (process.env.port || port));