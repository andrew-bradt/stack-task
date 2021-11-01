import React, {Fragment, useState} from 'react';
import {makeStyles} from '@material-ui/core';

// Material UI Components
import {
    Button,
    Container,
    Divider,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';

// Styles
const useStyles = makeStyles({
    btn:{
        display:'block',
        marginBottom:20
    },
    btnlong:{
        width:'100%'
    },
    btnshort:{
        width:'30%'
    },
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'80vh',
    },
    error:{
        marginTop:-10,
    },
    field:{
        marginBottom:20,
        display:'block'
    },
    paper:{
        width:'360px',
        padding:20
    },
});

export default function SignUp({onUserId, toLogin}) {
    // State
    const classes = useStyles();
    const [userCredentials, setUserCredentials] = useState({
        email:'',
        password:'',
        confirmPassword:''
    });
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {email, password, confirmPassword} = userCredentials;
    // Handlers
    const checkPasswordMatch = ()=>{
        if(password!==confirmPassword){
            setPasswordsDontMatch(true);
        }
    };
    const checkForCredentials = ()=>{
        if(email.length === 0 || password.length === 0){
            if(email.length===0){
                setEmailError(true);
            } 
            if(password.length===0){
                setPasswordError(true);
            }
        }
    };
    const resetErrors=()=>{
        setEmailError(false);
        setPasswordError(false);
        setPasswordsDontMatch(false);
        setErrorMessage('');
    };
    const onChange = (e)=>{
        const {id, value} = e.target;
        setUserCredentials({...userCredentials,[id]:value});
    }
    const onSubmit = async(e)=>{
        e.preventDefault();
        resetErrors();
        if(emailError || passwordError || passwordsDontMatch){
            return;
        };
        const res = await fetch('/create-user',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({email, password})
        });
        const data = await res.json();
        if(data.user_id){
            onUserId(data.user_id);
        } else {
            setErrorMessage(data.msg);
        }
    }
    // Rendering
    return (
        <Container size='sm' className={classes.container}>
            <Paper
                className={classes.paper}
                elevation={3}
            >
                <form>
                    <TextField className={classes.field}required id='email' variant='outlined' label='Email' fullWidth onChange={onChange} error={emailError}></TextField>
                    <TextField className={classes.field}required type='password' id='password' variant='outlined' label='Password' fullWidth onChange={onChange} error={passwordError}></TextField>
                    <TextField className={classes.field}required type='password' id='passwordsMatch' variant='outlined' label='Confirm Password' fullWidth onChange={onChange} error={passwordsDontMatch}></TextField>
                    <Button className={[classes.btn, classes.btnlong]} type='submit' color='primary' variant='contained' onClick={(e)=>onSubmit(e)}>Sign Up</Button>
                </form>
                {
                    (errorMessage)?<Typography className={classes.error} variant='p'>{errorMessage}</Typography>:<Fragment></Fragment>
                }
                <Divider light style={{marginBottom:20}}/>
                <Button className={classes.btnshort} color='secondary' variant='outlined' onClick={()=>toLogin('login')}>Log In</Button>
            </Paper>

        </Container>
    )
}
