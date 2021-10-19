import React,{useState} from 'react'
import {Button,TextField} from '@material-ui/core';

export default function SignUpForm({onSignUp,navToLogin}) {
    const [userFields, setUserFields] = useState({
        email:'',
        password:'',
        verifyPassword:''
    });

    const onChange = (e)=>{
        e.preventDefault();
        const {id, value} = e.target;
        const updatedUserFields = {...userFields, [id]:value};
        setUserFields(updatedUserFields);
    }

    const onSubmit = async(e)=>{
        e.preventDefault();
        if(checkPassword()){
            const response = await fetch('/create-user',{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(userFields)
            });
            const {user_id} = await response.json();
            onSignUp(user_id);
        } else {
            alert('Passwords Do Not Match');
        }
    }

    const checkPassword=()=>{
        const {password, verifyPassword} = userFields;
        return (password===verifyPassword);
    }

    return (
        <div>
            <TextField InputLabelProps={{htmlFor:'email'}} inputProps={{id:'email'}} label='email' onChange={onChange}>Email</TextField>
            <TextField InputLabelProps={{htmlFor:'password'}} inputProps={{id:'password'}} label='password' onChange={onChange} type='password'>Password</TextField>
            <TextField InputLabelProps={{htmlFor:'verifyPassword'}} inputProps={{id:'verifyPassword'}} label='verifyPassword' onChange={onChange} type='password'>Verify Password</TextField>
            <Button onClick={onSubmit}>Register</Button>
            <Button onClick={()=>navToLogin('login')}>Login</Button>
        </div>
    )
}
