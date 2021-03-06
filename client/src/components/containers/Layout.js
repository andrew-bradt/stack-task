import React, { Fragment } from 'react'
import { alpha, makeStyles } from '@material-ui/core';
import logo from '../../assets/logo512.png';
// MUI Components
import {
    AppBar,
    Container,
    InputBase,
    Toolbar,
    Typography,
} from '@material-ui/core';

// MUI Icons
import { Search as SearchIcon } from '@material-ui/icons';

//
const useStyles = makeStyles((theme) => ({
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
    logo:{
        maxWidth:'30px',
    },
    root: {
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
        width: '50%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto'
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
    signOut: {
        cursor: 'pointer',
        marginLeft: -3,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 0
        }
    },
    title: {
        flexGrow: 1,
        textAlign: 'left',
        marginTop:'5px',
        marginLeft:'10px'
    },
    ToolbarMargin: {
        ...theme.mixins.Toolbar,
        marginTop: 50
    },
}));

export default function Layout({ children, user_id, onUserId, onSearchChange }) {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            {/* App Bar */}
            <AppBar>
                <Toolbar>
                    <img class={classes.logo} src={logo}/>
                    <Typography className={classes.title} variant='h5'>
                        Stack Task
                    </Typography>
                    {
                        (user_id)
                            ?
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <   SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search???"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={onSearchChange}
                                />
                            </div>
                            :
                            <Fragment />
                    }
                    <Typography
                        onClick={() => onUserId(null)}
                        className={classes.signOut}
                    >
                        {(user_id) ? 'Sign Out' : ''}
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* Children */}
            <div className={classes.ToolbarMargin} />
            <div className={classes.root}>{children}</div>
        </Container>
    )
}
