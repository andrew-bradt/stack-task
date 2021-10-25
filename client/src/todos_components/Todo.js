// Modules - Misc
import React,{useState, Fragment} from 'react';
import {makeStyles} from '@material-ui/core';
// MUI - Components
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
// MUI - Icons
import Delete from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
// Custom Components
export default function Todo({todo, onDelete, onToggleEdit}) {
    const {todo_id, title, description} = todo;
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    return (
        <Fragment>
            <Card>
                <CardContent>
                        <Typography
                            variant='h5'
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant='p'
                        >
                            {description}
                        </Typography>
                </CardContent>
                <CardActions>
                        <IconButton aria-label='delete' onClick={()=>{onDelete(todo_id)}}>
                            <Delete/>
                        </IconButton>
                        <IconButton aria-label='edit' onClick={()=>onToggleEdit(todo_id)}>
                            <CreateIcon/>
                        </IconButton>
                </CardActions>
            </Card>
       </Fragment>
    )
}
