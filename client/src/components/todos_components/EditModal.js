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
// MUI Icons
import Delete from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
const useStyles = makeStyles({
    modalWrapper:{
        width:'100vw',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    modalCard:{
        width:'100%',
        margin:20
    },
    field: {
    }
});
export default function EditModal({todo, onUndo, onOverwrite}) {
    const [todoToEdit, setTodoToEdit] = useState({
        todo_id:todo.todo_id,
        title:todo.title,
        description:todo.description
    })
    const classes = useStyles();
    const onInput = (e)=>{
        const {id, value}=e.target;
        const changedTodo = {...todoToEdit,[id]:value};
        setTodoToEdit(changedTodo);
    }   
       return (
        <Modal open={!(!todo)}>
            <Container className={classes.modalWrapper}>
                <Card className={classes.modalCard}>
                    <CardContent>
                        <Typography>Edit Note</Typography>
                        <form noValidate autoComplete='off'>
                            <TextField
                                label='Title'
                                id='title'
                                value={todoToEdit.title}
                                onChange={onInput}
                                required
                                fullWidth
                            >
                                Task
                            </TextField>
                            <TextField
                                label='Description'
                                id='description'
                                value={todoToEdit.description}
                                onChange={onInput}
                                fullWidth
                            >
                                Description
                            </TextField>
                            <IconButton onClick={()=>onUndo()}>
                                <Delete/>
                            </IconButton>
                            <IconButton onClick={()=>onOverwrite(todoToEdit)}>
                                <SaveIcon/>
                            </IconButton>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Modal>
    )
}
