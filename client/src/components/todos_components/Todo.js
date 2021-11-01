// Modules - Misc
import React,{Fragment, useState} from 'react';
import {makeStyles} from '@material-ui/core';
// MUI - Components
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@material-ui/core';
// MUI - Icons
import { 
    ClearIcon, 
    CreateIcon, 
    Delete, 
    SaveIcon,
} from '@material-ui/icons';
// Custom Components
const useStyles = makeStyles((theme)=>({
    button:{
        minWidth:'92px',
    },
    buttonGroup:{
       marginTop:10
    },
    gridButtonGroup:{
        justifyContent:'flex-end',
        [theme.breakpoints.down('xs')]:{
            justifyContent:'center'
        }
    },
    listItemText:{
        wordWrap:'break-word',
        [theme.breakpoints.down('xs')]:{
            textAlign:'center'
        }
    }
}));
export default function Todo({todo, onDelete, onToggleEdit}) {
    const classes = useStyles();
    const {todo_id, title, description} = todo;
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    return (
        <Fragment>
            <ListItem divider className={classes.listItem}>
                <Grid 
                    container
                    direction='row'
                    justifyContent='space-between'
                    alignItems='flex-start'
                    >
                    <Grid 
                        item
                        xs={12}
                        sm={6}
                    >
                        <ListItemText 
                            className={classes.listItemText} primary={title} secondary={description}
                        />
                    </Grid>
                    <Grid 
                        item
                        xs={12}
                        sm={6}
                        container
                        className={classes.gridButtonGroup}
                    >
                        <ButtonGroup className={classes.buttonGroup} variant='outlined' size='small'>
                        <Button className={classes.button} onClick={()=>onToggleEdit(todo_id)}startIcon={<CreateIcon/>}>Edit</Button>
                        <Button className={classes.button} color='error' onClick={()=>onDelete(todo_id)}startIcon={<Delete/>}>Delete</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </ListItem>
        </Fragment>
    )
}
