import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core';
// MUI Components
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// MUI Icons
import Delete from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
const useStyles = makeStyles(theme=>({
    field: {
        
    },
    header:{
        ...theme.typography.header
    },
    input:{
        marginBottom:20,
        marginRight:'auto'
    },
    modalCard:{
        width:'80%',
        margin:20
    },
    modalWrapper:{
        width:'100vw',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
}));
export default function EditModal({todo, onUndo, onOverwrite}) {
    const [todoToEdit, setTodoToEdit] = useState({
        todo_id:todo.todo_id,
        title:todo.title,
        description:todo.description
    });
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
                        <Typography 
                            variant='h5'
                            className={classes.header}
                        >
                            Edit Note</Typography>
                        <form noValidate autoComplete='off'>
                            <TextField
                                className={classes.input}
                                label='Title'
                                variant='outlined'
                                id='title'
                                value={todoToEdit.title}
                                onChange={onInput}
                                required
                                fullWidth
                            >
                                Task
                            </TextField>
                            <TextField
                                className={classes.input}
                                label='Description'
                                variant='outlined'
                                id='description'
                                value={todoToEdit.description}
                                onChange={onInput}
                                fullWidth
                            >
                                Description
                            </TextField>
                            <ButtonGroup className={classes.buttonGroup} variant='outlined' size='small'>
                                <Button className={classes.button} onClick={()=>onUndo()}startIcon={<Delete/>}>Undo</Button>
                                <Button className={classes.button} color='error' onClick={()=>onOverwrite(todoToEdit)}startIcon={<SaveIcon/>}>Save</Button>
                            </ButtonGroup>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Modal>
    )
}
