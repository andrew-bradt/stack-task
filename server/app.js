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

app.post('/create-user',async(req,res)=>{
    const {email, password} = req.body;
    const hash =  bcrypt.hashSync(password, 10);
    try{
        const dbRes = await pool.query(
            'INSERT INTO users (Email, Hash) VALUES ($1, $2) RETURNING *;',
            [email, hash]
        );
        res.json('User Created');
    } catch(err){
        console.error(err.message);
    }
});

module.exports = app;
