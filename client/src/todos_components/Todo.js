// Modules - Misc
import React from 'react';
import {makeStyles} from '@material-ui/core';
// MUI - Components
import Card from '@material-ui/core/Card';

export default function Todo({todo}) {
    const {todo_id, title, description} = todo;
    return (
        <div>
            {title}, {description}
        </div>
    )
}
