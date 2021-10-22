import React,{useState,Fragment} from 'react';
import {useHistory} from 'react-router-dom';
// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    paper:{
        width:'360px',
        padding:20
    },
    field:{
        marginBottom:20,
        display:'block'
    },
    btn:{
        display:'block',
        marginBottom:20
    },
    btnlong:{
        width:'100%'
    },
    btnshort:{
        width:'30%'
    }
});

export default function SignUp({onUserId}) {
    // State
    const classes = useStyles();
    const history = useHistory();
    const [userCredentials, setUserCredentials] = useState({
        email:'',
        password:'',
        confirmPassword:''
    });
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);    
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
            history.push('/todos');
        }
        console.log(userCredentials);
    }
    // Rendering
    return (
        <Container size='sm'>
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
                <Divider light style={{marginBottom:20}}/>
                <Button className={classes.btnshort} color='secondary' variant='outlined' onClick={()=>history.push('/')}>Log In</Button>
            </Paper>
        </Container>
    )
}
