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
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
// MUI - Icons
import Delete from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
// Custom Components
const useStyles = makeStyles({
   listItem:{
       display:'flex',
       alignItems:'flex-start',
       justifyContent:'flex-start'
    },
    buttonGroup:{
       marginTop:5
    },
    divider:{
        width:'98%',
        marginLeft:'1%'
    }
});
export default function Todo({todo, onDelete, onToggleEdit}) {
    const classes = useStyles();
    const {todo_id, title, description} = todo;
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    return (
        <Fragment>
            <ListItem className={classes.listItem}>
                <ListItemText primary={title} secondary={description}/>
                <ButtonGroup className={classes.buttonGroup} variant='outlined' size='small'>
                    <Button onClick={()=>onToggleEdit(todo_id)}startIcon={<CreateIcon/>}>Edit</Button>
                    <Button onClick={()=>onDelete(todo_id)}startIcon={<Delete/>}>Delete</Button>
                </ButtonGroup>
            </ListItem>
            <Divider className={classes.divider}/>
        </Fragment>
    )
}
