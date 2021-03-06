import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core';

// MUI Components
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Container,
    Modal,
    TextField,
    Typography,
} from '@material-ui/core';

// MUI Icons
import {
    Delete, 
    Save as SaveIcon,
} from '@material-ui/icons';

// Styles
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
        width:'40%',
        height:'auto',
        padding:10,
        position:'absolute',
        left:'30vw',
        top:'32vh',
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
        <Modal 
            open={!(!todo)} 
            >
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
                                autoFocus
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
        </Modal>
    )
}
