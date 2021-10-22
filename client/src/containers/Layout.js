import React from 'react'
import {makeStyles} from '@material-ui/core';
// MUI Components
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root:{
        minHeight:'100vh',
        display:'flex', 
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
});

export default function Layout({children}) {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <div className={classes.root}>{children}</div>
        </Container>
    )
}
