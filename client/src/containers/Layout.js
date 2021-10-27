import React,{useState} from 'react'
import {makeStyles} from '@material-ui/core';
// MUI Components
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>({
    // root:{
    //     minHeight:'100vh',
    //     display:'flex', 
    //     flexDirection:'row',
    //     display:'flex',
    //     justifyContent:'center',
    //     alignItems:'center'
    // },
    root:{
    },
    title:{
        flexGrow:1,
        textAlign:'left'
    },
    signOut:{
        cursor:'pointer'
    },
    toolbarMargin:{
        ...theme.mixins.toolbar,
        marginTop:50
    }
}));

export default function Layout({children,user_id, onUserId}) {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            {/* App Bar */}
            <AppBar>
                <ToolBar>
                    <Typography className={classes.title} variant='h5'>
                        Todo App
                    </Typography>
                    <Typography
                        onClick={()=>onUserId(null)}
                        className={classes.signOut}
                    >
                        {(user_id)?'Sign Out':''}
                    </Typography>
                </ToolBar>
            </AppBar>
            {/* Children */}
            <div className={classes.toolbarMargin}/>
            <div className={classes.root}>{children}</div>
        </Container>
    )
}
