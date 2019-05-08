const cohortsRouter = require('express').Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

cohortsRouter.get('/', (req, res) => {
    db('Cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})


cohortsRouter.use((req, res, next) => {
    res.status(404).json({ message:'no information here'})
})


module.exports = cohortsRouter;