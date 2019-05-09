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

studentsRouter.get('/:id', (req, res) => {
    db('Students')
    .where({ id:req.params.id})
    .first()
    .then(student => {
        student ? res.status(200).json(student) : res.status(404).json({ message:" can not locate student"})
    })
    .catch(err => {res.status(500).json(err)})
})

studentsRouter.post('/', (req, res) => {
    db('Students')
    .insert(req.body)
    .then(student => {
        const [id] = student;
        db('Students')
        .where({id})
        .then(student => {
            student ? res.status(200).json(student): res.status(400).json({message: "additional info required"})
        })
    })
    .catch(err => {res.status(500).json(err)})
})

studentsRouter.delete('/:id', (req, res) => {
    db('Students')
    .where({ id: req.params.id})
    .del()
    .then(count => { count > 0 ? res.status(200).json({message: "student deleted"}) : res.status(404).json({message:"can not locate student"})})
    .catch(err => {res.status(500).json(err)})
})

studentsRouter.put('/:id', (req, res) => {
    db('Students')
    .where({ id: req.params.id})
    .update(req.body)
    .then(count => {
        count > 0 ? 
        db('Students')
        .where({id:req.params.id})
        .first()
        .then(updatedStudent => {res.status(200).json(updatedStudent)}) : res.status(404).json({message:" can not locate student with this id"})
    })
    .catch(err => {res.status(500).json(err)})
})


studentsRouter.use((req, res, next) => {
    res.status(404).json({ message: "can not locate student"})
})
module.exports = studentsRouter;