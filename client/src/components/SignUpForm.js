import React from 'react'
import {Button,TextField} from '@material-ui/core';

export default function SignUpForm() {
    return (
        <div>
            <TextField InputLabelProps={{htmlFor:'email'}} inputProps={{id:'email'}} label='email'>Email</TextField>
            <TextField InputLabelProps={{htmlFor:'password'}} inputProps={{id:'password'}} label='password'>Password</TextField>
            <Button>Register</Button>
        </div>
    )
}
