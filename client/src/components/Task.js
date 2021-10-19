import React,{useState,Fragment} from 'react'
import {TextField,Button} from '@material-ui/core';

export default function Task({todoItem, onSubmit, onDelete, onEdit}) {
    const {title, description,todo_id} = todoItem;
    const [toggleEdit, setToggleEdit] = useState(false);
    const isDescription = (description)=>{
        if(description)
        return<p>{description}</p>
    }
    return (
        <div>
                <h3>{title}</h3>
                {isDescription(description)}
                <Button onClick={()=>onDelete(todo_id)}>Delete</Button>  
                {
                    (!toggleEdit)
                    ?<Button onClick={()=>setToggleEdit(true)}>Edit</Button> 
                    :
                    <Fragment>
                        <Button>Save</Button>
                        <Button onClick={()=>setToggleEdit(false)}>Cancel</Button>
                    </Fragment>
                }
        </div>
    )
}
