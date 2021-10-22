import React,{useState} from 'react'
import {makeStyles} from '@material-ui/core';
// MUI Components
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>({
    root:{
        minHeight:'100vh',
        display:'flex', 
        flexDirection:'row',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        flexGrow:1,
        height:'50px',
        textAlign:'left',
        padding:10,
    }
}));

export default function Layout({children,user_id}) {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            {/* App Bar */}
            <AppBar>
                <Typography className={classes.title} variant='h5'>
                    Todo App
                </Typography>
                <Typography>
                    {(user_id)?'Sign Out':''}
                </Typography>
            </AppBar>
            {/* Children */}
            <div className={classes.root}>{children}</div>
        </Container>
    )
}
