import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

// MUI Components
import {
    Button,
    Container,
    TextField,
    Typography
} from '@material-ui/core';

// MUI Icons
import {Add as AddIcon} from '@material-ui/icons';

// Styles
const useStyles = makeStyles(theme=>({
    addTask: {
        marginBottom: 40
    },
    // container: {
    //     marginLeft: -7,
    //     width: '80vw',
    //     textAlign: 'left',
    //     marginBottom: 40,
    //     [theme.breakpoints.down('xs')]:{
    //         textAlign:'center'
    //     }
    // },
    header:{
        ...theme.typography.header,
        marginTop:80
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
    addTaskButtonContainer:{
        textAlign:'left'
    }
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
            {/* <Container
                size="sm"
                className={classes.container}
                justifyContent='center'
            > */}
                <TextField
                    variant='outlined'
                    label='Title'
                    id='title'
                    value={todo.title}
                    fullWidth
                    onChange={onInput}
                    className={classes.input}
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
                <Container
                    disableGutters
                    className={classes.addTaskButtonContainer}
                >
                    <Button
                        size="small"
                        startIcon={<AddIcon />}
                        variant='outlined'
                        onClick={() => onSubmit(todo)}
                    >
                        Add Task
                    </Button>
                </Container>
            {/* </Container> */}
        </form>
    )
}