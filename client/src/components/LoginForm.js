import React from 'react'
import {Button,TextField} from '@material-ui/core';

export default function LoginForm() {
    return (
        <div>
            <TextField InputLabelProps={{htmlFor:'email'}} inputProps={{id:'email'}} label='email'>Email:</TextField>
            <TextField InputLabelProps={{htmlFor:'password'}} inputProps={{id:'password'}} label='password'>Email:</TextField>
            <Button>Login</Button>
        </div>
    )
}
