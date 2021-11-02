// Dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();

// App-Level Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Route Imports
const createUser = require('./routes/create-user');
const login = require('./routes/login');
const addTodo = require('./routes/add-todo');
const getTodos = require('./routes/get-todos');
const removeTodo = require('./routes/remove-todo');
const changeTodo = require('./routes/change-todo');
/* -- Routes -- */

// Account
app.use('/create-user', createUser);
app.use('/login', login);

// TODO Operations
app.use('/add-todo', addTodo);
app.use('/get-todos', getTodos);
app.use('/remove-todo', removeTodo);
app.use('/change-todo', changeTodo);

module.exports = app;
