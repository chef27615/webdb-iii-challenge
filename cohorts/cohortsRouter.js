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

cohortsRouter.get('/:id', (req, res) => {
    db('Cohorts')
    .where({ id: req.params.id})
    .first()
    .then(cohort => {
        cohort ? res.status(200).json(cohort) : res.status(404).json({ message: "no cohort associate with this id"})
    })
    .catch(err => {res.status(500).json(err)})
})

cohortsRouter.post('/', (req, res) => {
    db('Cohorts')
    .insert(req.body)
    .then(cohort => {
        const [id] = cohort;
        db('Cohorts')
        .where({ id })
        .then(newCohort => {
            newCohort ? res.status(200).json(newCohort) : res.status(400).json({ message: "require field not filled out"})
        })
    })
    .catch(err => { res.status(500).json(err)})
})


cohortsRouter.delete('/:id', (req, res) => {
    db('Cohorts')
    .where({ id: req.params.id})
    .del()
    .then(count => {
        count > 0 ? res.status(200).json({ message: "cohort deleted"}) : res.status(404),json({ message:"can not delete a none exist cohort"})
    })
    .catch(err => {res.status(500).json(err)})
})


cohortsRouter.put('/:id', (req, res) => {
    db('Cohorts')
    .where({ id: req.params.id})
    .update(req.body)
    .then(count => {
        count > 0 ? 
        db('Cohorts')
        .where({ id: req.params.id})
        .first()
        .then(cohort => {res.status(200).json(cohort)}) : res.status(404).json({ message:"can not update an unknown cohort"})
    })
    .catch(err => {res.status(500).json(err)})
})


cohortsRouter.use((req, res, next) => {
    res.status(404).json({ message:'no information here'})
})
module.exports = cohortsRouter;