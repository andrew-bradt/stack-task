import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core';
// MUI Components
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// MUI Icons
import Delete from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
const useStyles = makeStyles({
    addTask:{
        marginBottom:40
    },
});
const todoDefault = {
    title:'',
    description:''
};

export default function AddTask({user_id,addTaskToDb}) {
    const [todo, setTodo] = useState(todoDefault);
    const classes = useStyles();
    const onInput = (e)=>{
        const {id, value}=e.target;
        const changedTodo = {...todo,[id]:value};
        setTodo(changedTodo);
    }
    const onSubmit = ()=>{
        addTaskToDb(user_id,todo);
        setTodo(todoDefault);
    }
       return (
            <Card className={classes.addTask}>
                <CardContent>
                    <Typography>Add Task</Typography>
                    <form noValidate autoComplete='off'>
                        <TextField
                            label='Title'
                            id='title'
                            value={todo.title}
                            onChange={onInput}
                            required
                            fullWidth
                        >
                            Task
                        </TextField>
                        <TextField
                            label='Description'
                            id='description'
                            value={todo.description}
                            onChange={onInput}
                            fullWidth
                        >
                            Description
                        </TextField>
                        <Button
                            variant='contained'
                            onClick={()=>onSubmit(todo)}
                        >
                            Add Task
                        </Button>
                    </form>
                </CardContent>
            </Card>
    )
}