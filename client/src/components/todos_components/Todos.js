import React, { Fragment, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core';

// Material-Ui Components
import {
    Container,
    Divider,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@material-ui/core';
import {
    ToggleButton,
    ToggleButtonGroup,
} from '@material-ui/lab';

// Material-Ui Icons
import {CloseIcon, DeleteIcon, SortByAlphaIcon} from '@material-ui/icons';

// Custom Components
import {AddTask, EditModal, Todoo} from '../todos_components';

// Styles
const useStyles = makeStyles(theme=>({
    container: {
        width: '80vw',
    },
    divider:{
        width:'98%',
        marginLeft:'1%'
    },
    header:{
        ...theme.typography.header
    },
    toggleButton:{
        height:26,
        marginLeft:10
    },
    toggleContainer:{
        textAlign:'left',
        padding:16,
        paddingTop:0,
        paddingBottom:10,
        [theme.breakpoints.down('xs')]:{
            textAlign:'center'
        }
    },
    toggleLabel:{
        display:'inline-block',
    },
    responsiveAlignText:{
        textAlign:'left',
        [theme.breakpoints.down('xs')]:{
            textAlign:'center'
        }
    },
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
                    className={[classes.header,classes.responsiveAlignText]}
                >
                    Your Tasks
                </Typography>
                <List disablePadding>
                    <Container className={classes.toggleContainer}>
                        <Typography
                            className={classes.toggleLabel}
                            variant='subtitle1'
                        >
                            Sort Tasks By Title:
                        </Typography>
                        <ToggleButtonGroup 
                            value={sortMethod} 
                            onChange={onSortChange}
                            exclusive
                        >
                            <ToggleButton className={classes.toggleButton} value='alphabetical'>A to Z</ToggleButton>
                            <ToggleButton className={classes.toggleButton} value='reverse-alphabetical'>Z to A</ToggleButton>
                        </ToggleButtonGroup>
                    </Container>
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
