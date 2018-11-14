const express = require('express');
const session = require('./session/controller');

const app = express();

const port = 80;
const server = "localhost";

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(__dirname + "/../dist/"));
app.use('/session', session);

app.listen(port);
// eslint-disable-next-line
console.log(`listening on: http://${server}:${port}`);