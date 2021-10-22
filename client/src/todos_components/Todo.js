// Modules - Misc
import React from 'react';
import {makeStyles} from '@material-ui/core';
// MUI - Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// MUI - Icons
import Delete from '@material-ui/icons/Delete';

export default function Todo({todo, onDelete}) {
    const {todo_id, title, description} = todo;
    return (
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
           </CardActions>
       </Card>
    )
}
