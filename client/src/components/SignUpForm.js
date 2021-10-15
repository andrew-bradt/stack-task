import React,{useState} from 'react'
import {Button,TextField} from '@material-ui/core';

export default function SignUpForm() {
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
        const body = userFields;
        const response = await fetch('/create-user',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body)
        });
    }

    return (
        <div>
            <TextField InputLabelProps={{htmlFor:'email'}} inputProps={{id:'email'}} label='email' onChange={onChange}>Email</TextField>
            <TextField InputLabelProps={{htmlFor:'password'}} inputProps={{id:'password'}} label='password' onChange={onChange}>Password</TextField>
            <Button onClick={onSubmit}>Register</Button>
        </div>
    )
}
