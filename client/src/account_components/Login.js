import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    paper: {
        width: '360px',
        padding: 20
    },
    field: {
        marginBottom: 20,
        display: 'block'
    },
    btn: {
        display: 'block',
        marginBottom: 20
    },
    btnlong: {
        width: '100%'
    },
    btnshort: {
        width: '30%'
    }
});
export default function Login({ onUserId, toSignUp }) {
    // State
    const classes = useStyles();
    const history = useHistory();
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
    // Rendering
    return (
        <Container size='sm'>
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
