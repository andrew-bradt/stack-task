import React,{useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
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

// Styles
const useStyles = makeStyles({
    container:{
        width:'80vw',
    }
});

export default function Todos({user_id}) {
    const [todos, setTodos] = useState([]);
    const classes = useStyles();
    useEffect(()=>{
        if(user_id){
            (async()=>{
                const response = await fetch(`/get-todos?user_id=${user_id}`);
                const data = await response.json();
                setTodos(data);
            })();
        }
    },[]);
    // Handlers
    const eraseTodo = async(id)=>{
        const response = await fetch(`/remove-todo?todo_id=${id}`,{
            method:'DELETE'
        });
        const data = await response.json();
        return data;
    };
    const onDelete = (id)=>{
        const filteredTodos = todos.filter(todo=>todo.todo_id!==id);
        setTodos(filteredTodos);
        eraseTodo(id);
    };
   
    return (
        <Container className={classes.container}>
            <List>
                {
                    (todos.length>0)
                    ?
                    todos.map(todo=>{
                        const {todo_id, title, description} = todo;
                        return(
                                <Todo key={todo_id} todo={todo} onDelete={onDelete}></Todo>
                        );
                    })
                    :
                    <Typography>You have no tasks!</Typography>
                }
            </List>
        </Container>
    )
}
