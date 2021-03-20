import { AppBar, Toolbar, makeStyles, Grid, Box,  Button } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from './../img/logo.png'

const useStyles = makeStyles({
    headerLogo: {
        width: "80px"
    },
    container:{
        height:'100%'
    },
    bar: {
        marginTop: "10px"
    },
    headerLinks: {
        marginRight: "20px"
    },
    root: {
        flexGrow: 1,
    },  
})

const Header = () => {
    const classes = useStyles();
    
    return (
    <div>
        <AppBar position="static" elevation={0} color="transparent">
            <Toolbar>
                <Grid container className={classes.bar} direction="row" >
                    <Grid item xs={4}>
                        <Grid container justify="flex-start" alignItems='center'>
                            <Box component={NavLink} to="/" >
                                <img src={logo} className={classes.headerLogo} alt='app_bar_logo'></img>
                            </Box>
                        </Grid>     
                    </Grid>
                    <Grid item xs={8} >
                        <Grid container justify='flex-end' alignItems='center' direction='row' className={classes.container} >
                            <Button component={NavLink} to="/about">About</Button>
                            <Button component={NavLink} to="/login">Log In</Button>
                            <Button component={NavLink} to="/signup">Sign Up</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    </div>
    )
}
export default Header
