import React,{useState, Fragment} from 'react'
import {alpha, makeStyles} from '@material-ui/core';
// MUI Components
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
// MUI Icons
import SearchIcon from '@material-ui/icons/Search';
//
const useStyles = makeStyles((theme)=>({
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
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
      },
    inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: '20ch',
    },
    },
}));

export default function Layout({children,user_id, onUserId, onSearchChange}) {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            {/* App Bar */}
            <AppBar>
                <ToolBar>
                    <Typography className={classes.title} variant='h5'>
                        Todo App
                    </Typography>
                    {
                        (user_id)
                        ?   
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                            <   SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={onSearchChange}
                            />
                        </div>
                        :
                        <Fragment/>
                    }
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
