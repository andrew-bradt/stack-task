import React,{useState} from 'react'
import {Button,TextField} from '@material-ui/core';

export default function LoginForm() {
    const [userFields, setUserFields] = useState({
        email:'',
        password:''
    });

    const onChange = (e)=>{
        e.preventDefault();
        const {id, value} = e.target;
        const updatedUserFields = {...userFields, [id]:value};
        setUserFields(updatedUserFields);
    }
    
    const onSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch('/login',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(userFields)
        });
        const data = await response.json();
    }

    return (
        <div>
            <TextField InputLabelProps={{htmlFor:'email'}} inputProps={{id:'email'}} label='email' onChange={onChange}>Email</TextField>
            <TextField InputLabelProps={{htmlFor:'password'}} inputProps={{id:'password'}} label='password' onChange={onChange}>Password</TextField>
            <Button onClick={onSubmit}>Login</Button>
        </div>
    )
}
