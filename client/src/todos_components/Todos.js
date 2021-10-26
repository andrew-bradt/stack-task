import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
// Material-Ui Components
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
// Material-Ui Icons
import DeleteIcon from '@material-ui/icons/Delete';
// Custom Components
import Todo from './Todo';
import AddTask from './AddTask';
import EditModal from './EditModal';
// Styles
const useStyles = makeStyles({
    container: {
        width: '80vw'
    },
    yourTasks:{
        textDecoration:'underline'
    }
});
export default function Todos({ user_id }) {
    const [todos, setTodos] = useState([]);
    const [editTodo, setEditTodo] = useState(null);
    const classes = useStyles();
    useEffect(() => {
        if (user_id) {
            (async () => {
                const response = await fetch(`/get-todos?user_id=${user_id}`);
                const data = await response.json();
                setTodos(data);
            })();
        }
    }, []);
    const eraseTodo = async (id) => {
        const response = await fetch(`/remove-todo?todo_id=${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    };
    const changeToDo = async (todo) => {
        const { todo_id } = todo;
        const response = await fetch(`/change-todo?todo_id=${todo_id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo)
        });
        const data = await response.json();
        return data;
    };
    const onDelete = (id) => {
        const filteredTodos = todos.filter(todo => todo.todo_id !== id);
        setTodos(filteredTodos);
        eraseTodo(id);
    };
    const onToggleEdit = (id) => {
        const filteredTodo = todos.filter(todo => todo.todo_id === id)[0];
        setEditTodo(filteredTodo);
    };
    const undoEdit = () => {
        setEditTodo(null);
    };
    const overwriteTodo = (overwrittenTodo) => {
        const updatedTodos = todos.map(todo => (todo.todo_id === overwrittenTodo.todo_id) ? todo = overwrittenTodo : todo);
        setTodos(updatedTodos);
        setEditTodo(null);
        changeToDo(overwrittenTodo);
    };
    const addTaskToDb = async (user_id, todo) => {
        const response = await fetch(`/add-todo?user_id=${user_id}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo)
        });
        const data = await response.json();
        const updatedTodos = [...todos, data];
        setTodos(updatedTodos);
    }

    return (
        <Container>
            <Container className={classes.container}>
                <AddTask addTaskToDb={addTaskToDb} user_id={user_id} />
                <Typography
                    variant='h5'
                    align='left'
                    className={classes.yourTasks}
                >Your Tasks</Typography>
                <List>
                    
                    {
                        (todos.length > 0)
                            ?
                            todos.map(todo => {
                                const { todo_id, title, description } = todo;
                                return (
                                    <Todo key={todo_id} todo={todo} onDelete={onDelete} onToggleEdit={onToggleEdit}></Todo>
                                );
                            })
                            :
                            <Typography>You have no tasks!</Typography>
                    }
                </List>
            </Container>
            {
                (!(!editTodo)) ? <EditModal todo={editTodo} onUndo={undoEdit} onOverwrite={overwriteTodo} /> : <Fragment />
            }
        </Container>
    )
}
