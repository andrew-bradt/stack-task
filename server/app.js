require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

const pool = require('./db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.post('/create-user', async (req, res) => {
    const { email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    try {
        const queryRes = await pool.query(
            'INSERT INTO users (email, hash) VALUES ($1, $2)',
            [email, hash]
        );
        res.json('User Created');
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const queryRes = await pool.query(
            'SELECT * FROM users JOIN todos ON users.user_id=todos.user_id WHERE email=$1',
            [email]
        );
        const { hash } = queryRes.rows[0];
        const doesPasswordMatch = bcrypt.compareSync(password, hash);
        if (doesPasswordMatch) {
            const {user_id} = queryRes.rows[0];
            const todos = queryRes.rows.map(({user_id,email, hash,...todos})=>todos);
            const data = {
                user_id,
                todos
            }
            res.json(data);
        }
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/add-todo/:user_id',async(req,res)=>{
    const {user_id} = req.params;
    const {title,description} = req.body;
    try{
        const queryRes = await pool.query(
            `INSERT INTO 
            todos (title, description, user_id) 
            VALUES ($1, $2, $3) 
            RETURNING *`,
            [title, description, user_id]
        ); 
        res.json(queryRes.rows[0]);
    } catch (err){
        console.error(err.message);
    }

})

module.exports = app;
