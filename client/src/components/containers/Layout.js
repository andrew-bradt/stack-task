import React,{Fragment, useState} from 'react'
import {alpha, makeStyles} from '@material-ui/core';

// MUI Components
import {
    AppBar,
    Button,
    Container,
    InputBase,
    ToolBar,
    Typography,
} from '@material-ui/core';

// MUI Icons
import {SearchIcon} from '@material-ui/icons';

//
const useStyles = makeStyles((theme)=>({
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
    inputRoot: {
        color: 'inherit',
    },
    root:{
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
        width: '60%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width:'auto'
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
    signOut:{
        cursor:'pointer'
    },
    title:{
        flexGrow:1,
        textAlign:'left'
    },
    toolbarMargin:{
        ...theme.mixins.toolbar,
        marginTop:50
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
