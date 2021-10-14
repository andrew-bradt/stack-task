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
        const userRes = await pool.query(
            'SELECT user_id, hash FROM users WHERE email=$1',
            [email]
        );
        const { hash, user_id } = userRes.rows[0];
        const doesPasswordMatch = bcrypt.compareSync(password, hash);
        if (doesPasswordMatch) {
            const todosRes = await pool.query(
                'SELECT todo_id, title, description FROM todos WHERE user_id=$1',
                [user_id]
            )
            const data = {
                user_id,
                todos:todosRes.rows
            }
            res.json(data);
        }
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/add-todo',async(req,res)=>{
    const {user_id} = req.query;
    const {title,description} = req.body;
    try{
        const queryRes = await pool.query(
            `
            INSERT INTO 
            todos (title, description, user_id) 
            VALUES ($1, $2, $3)
            RETURNING todo_id, title, description
            `,
            [title, description, user_id]
        ); 
        res.json(queryRes.rows[0]);
    } catch (err){
        console.error(err.message);
    }
})

app.delete('/remove-todo',async(req,res)=>{
    const {todo_id} = req.query;
    try{
        const queryRes = await pool.query(
            'DELETE FROM todos WHERE todo_id=$1',
            [todo_id]
        )
        res.json('Task Deleted');
    } catch(err){
        console.error(err.message);
    }
})

// app.put('/change-todo/:todo_id',async(req,res)=>{
//     const {todo_id} = req.params;
//     const {title,description} = req.body;
//     try{
//         const queryRes = await pool.query(
//             `UPDATE todos
//             SET (title, description)
//             VALUES ($2, $3)
//             WHERE todo_id=$1
//             RETURNING todo_id, title, description`,
//             [todo_id, title, description]
//         ); 
//         res.json(queryRes.rows[0]);
//     } catch (err){
//         console.error(err.message);
//     }
// })


module.exports = app;
