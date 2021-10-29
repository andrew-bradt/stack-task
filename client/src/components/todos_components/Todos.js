import React, { useState, useEffect, Fragment } from 'react';
import {makeStyles} from '@material-ui/core';
// Material-Ui Components
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
// Material-Ui Icons
import DeleteIcon from '@material-ui/icons/Delete';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import CloseIcon from '@material-ui/icons/Close';
// Custom Components
import Todo from '../todos_components/Todo';
import AddTask from '../todos_components/AddTask';
import EditModal from '../todos_components/EditModal';
// Styles
const useStyles = makeStyles(theme=>({
    container: {
        width: '80vw',
    },
    header:{
        ...theme.typography.header
    },
    divider:{
        width:'98%',
        marginLeft:'1%'
    },
    toggleGroup:{
    },
    toggleContainer:{
        textAlign:'left',
        marginLeft:-10
    },
    toggleButton:{
        height:26,
        marginLeft:10
    },
    toggleLabel:{
        display:'inline-block'
    }

}));
export default function Todos({ user_id, searchText }) {
    const [todos, setTodos] = useState([]);
    const [sortMethod, setSortMethod] = useState(null);
    const [editTodo, setEditTodo] = useState(null);
    const filteredTodos = todos.filter(todo=>{
        return todo.title.toLowerCase().includes(searchText.toLowerCase());
    });
    const sortedTodos = (()=>{
        switch(sortMethod){
            case 'alphabetical':
                return filteredTodos.sort((a,b)=>{
                    let x = a.title[0].toLowerCase();
                    let y = b.title[0].toLowerCase();
                    return (x>y)?1:-1;
                });
            case 'reverse-alphabetical':
                return filteredTodos.sort((a,b)=>{
                    let x = a.title[0].toLowerCase();
                    let y = b.title[0].toLowerCase();
                    return (x<y)?1:-1;
                })
            default:
                return filteredTodos;
        }
    })();
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
    const onSortChange = (e, newSortMethod)=>setSortMethod(newSortMethod);
    return (
        <Container>
            <Container className={classes.container}>
                <AddTask className={classes.addTask} addTaskToDb={addTaskToDb} user_id={user_id}/>
                <Typography
                    variant='h5'
                    align='left'
                    className={classes.header}
                >
                    Your Tasks
                </Typography>
                <Container className={classes.toggleContainer}>
                    <Typography
                        className={classes.toggleLabel}
                    >
                        Sort Tasks:
                    </Typography>
                    <ToggleButtonGroup 
                        className={classes.toggleGroup}
                        value={sortMethod} 
                        onChange={onSortChange}
                        exclusive
                    >
                        <ToggleButton className={classes.toggleButton} value='alphabetical'>A to Z</ToggleButton>
                        <ToggleButton className={classes.toggleButton} value='reverse-alphabetical'>Z to A</ToggleButton>
                    </ToggleButtonGroup>
                </Container>
                
                <List>
                    {
                        (todos.length > 0)
                            ?
                            (sortedTodos.length > 0)
                                ?
                                sortedTodos.map(todo => {
                                    const { todo_id, title, description } = todo;
                                    return (
                                        <Todo key={todo_id} todo={todo} onDelete={onDelete} onToggleEdit={onToggleEdit}></Todo>
                                    );
                                })
                                :
                                <Typography align='left'>There are no task titles that match your search criteria.</Typography>
                            :
                            <Typography align='left'>You have no tasks!</Typography>
                    }
                </List>
            </Container>
            {
                (!(!editTodo)) ? <EditModal todo={editTodo} onUndo={undoEdit} onOverwrite={overwriteTodo} /> : <Fragment />
            }
        </Container>
    )
}
