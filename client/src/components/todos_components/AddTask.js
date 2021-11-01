import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core';
// MUI Components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import TextAreaAutosize from '@material-ui/core/TextAreaAutosize';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// MUI Icons
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles(theme=>({
    addTask: {
        marginBottom: 40
    },
    container: {
        marginLeft: -7,
        width: '80vw',
        textAlign: 'left',
        marginBottom: 40,
        [theme.breakpoints.down('xs')]:{
            textAlign:'center'
        }
    },
    header:{
        ...theme.typography.header
    },
    input:{
        marginBottom:20,
        marginRight:'auto'
    },
    inputWidthResponsive:{
        width:'30%',
        [theme.breakpoints.down('xs')]:{
            width:'100%'
        }
    },
    responsiveAlignText:{
        textAlign:'left',
        [theme.breakpoints.down('xs')]:{
            textAlign:'center'
        }
    },
}));
const todoDefault = {
    title: '',
    description: ''
};
export default function AddTask({ user_id, addTaskToDb }) {
    const [todo, setTodo] = useState(todoDefault);
    const classes = useStyles();
    const onInput = (e) => {
        const { id, value } = e.target;
        const changedTodo = { ...todo, [id]: value };
        setTodo(changedTodo);
    }
    const onSubmit = () => {
        addTaskToDb(user_id, todo);
        setTodo(todoDefault);
    }
    return (
        <form noValidate autoComplete='off'>
            <Typography
                variant='h5'
                align='left'
                className={[classes.header,classes.responsiveAlignText]}
            >
                Add a Task
            </Typography>
            <Container
                size="sm"
                className={classes.container}
                justifyContent='center'
            >
                <TextField
                    variant='outlined'
                    label='Title'
                    id='title'
                    value={todo.title}
                    onChange={onInput}
                    className={[classes.input, classes.inputWidthResponsive]}
                    required
                />
                <TextField
                    variant='outlined'
                    label='Description'
                    id='description'
                    value={todo.description}
                    multiline
                    rows={1}
                    maxRows={4}
                    className={classes.input}
                    onChange={onInput}
                    fullWidth
                />
                <Button
                    size="small"
                    startIcon={<AddIcon />}
                    variant='outlined'
                    onClick={() => onSubmit(todo)}
                    className={classes.button}
                >
                    Add Task
                </Button>
            </Container>
        </form>
    )
}