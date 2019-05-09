const express = require('express');
const helmet = require('helmet');

const cohortsRouter = require('./cohorts/cohortsRouter');
const studentsRouter = require('./students/studentsRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

server.get('/', (req, res) => {
    res.send('<h2>Root Directory reached</h2>')
})

module.exports = server;

