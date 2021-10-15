import React,{useState} from 'react'
import {Button,TextField} from '@material-ui/core';

export default function AddTask({user_id}) {
    // user_id needs to be dynamic, static value put in for now
    const [task, setTask] = useState({
        title:'',
        description:'',
        user_id:133
        })

    const onChange = (e)=>{
        e.preventDefault();
        const {id, value} = e.target;
        const modifiedTask = {...task, [id]:value};
        setTask(modifiedTask);
    }

    const onSubmit = async(e)=>{
        e.preventDefault();
        const body = {
            title:task.title,
            description:task.description
        };
        // user_id should be passed in from parent component, now as a prop on task
        const response = await fetch(`/add-todo?user_id=${task.user_id}`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body)
        })
    }

    return (
        <div>
            <TextField inputProps={{id:'title', onChange:onChange}} InputLabelProps={{htmlFor:'title'}} label='title'/>
            <TextField inputProps={{id:'description', onChange:onChange}} InputLabelProps={{htmlFor:'description'}} label='description'/>
            <Button onClick={onSubmit}>Submit</Button>
        </div>
    )
}
