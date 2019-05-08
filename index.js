require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');


const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: "Root Directory reached"})
})

const port = process.env.PORT || 5000;
server.listen(port, () => 
    console.log(`\n ***** server running on ${port} ***** \n`)
)
