import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core';

// Material UI Components
import {
    Button,
    Container,
    Divider,
    Paper,
    TextField,
} from '@material-ui/core';

// Styles
const useStyles = makeStyles({
    btn: {
        display: 'block',
        marginBottom: 20
    },
    btnlong: {
        width: '100%'
    },
    btnshort: {
        width: '30%'
    },
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'80vh',
    },
    field: {
        marginBottom: 20,
        display: 'block'
    },
    paper: {
        width: '360px',
        padding: 20
    },
});
export default function Login({ onUserId, toSignUp }) {
    // State
    const classes = useStyles();
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    // Handlers
    const onChange = (e) => {
        const { id, value } = e.target;
        setUserCredentials({ ...userCredentials, [id]: value });
    }
    const onSubmit = async (e) => {
        const { email, password } = userCredentials;
        e.preventDefault();
        setEmailError(false);
        setPasswordError(false);
        if (email.length === 0 || password.length === 0) {
            if (email.length === 0) {
                setEmailError(true);
            }
            if (password.length === 0) {
                setPasswordError(true);
            }
            return;
        }
        const res = await fetch('/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.user_id) {
            onUserId(data.user_id);
        }
    }
    return (
        <Container size='sm' className={classes.container}>
            <Paper
                className={classes.paper}
                elevation={3}
            >
                <form>
                    <TextField className={classes.field} required id='email' variant='outlined' label='Email' fullWidth onChange={onChange} error={emailError}></TextField>
                    <TextField className={classes.field} required type='password' id='password' variant='outlined' label='Password' fullWidth onChange={onChange} error={passwordError}></TextField>
                    <Button className={[classes.btn, classes.btnlong]} type='submit' color='primary' variant='contained' onClick={(e) => onSubmit(e)}>Log In</Button>
                </form>
                <Divider light style={{ marginBottom: 20 }} />
                <Button className={classes.btnshort} color='secondary' variant='outlined' onClick={() => toSignUp('sign-up')}>Sign Up</Button>
            </Paper>
        </Container>
    )
}
