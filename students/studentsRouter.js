const studentsRouter = require('express').Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

studentsRouter.get('/', (req, res) => {
    db('Students')
    .then(students => {
        res.status(200).json(students)
    })
    .catch(err => {res.status(500).json(err)})
})








studentsRouter.use((req, res, next) => {
    res.status(404).json({ message: "can not locate student"})
})
module.exports = studentsRouter;