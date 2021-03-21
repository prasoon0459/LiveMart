import { AppBar, Toolbar, makeStyles, Grid, Box,  InputBase, IconButton, Badge, Menu, MenuItem } from '@material-ui/core'
import logo from '../img/logo.png'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { AccountCircle, LocationOnOutlined, Notifications, SearchOutlined, ShoppingCartOutlined} from '@material-ui/icons'
import theme from '../theme'

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
      search: {
        position: 'relative',
        height: '100%',
        borderRadius: theme.shape.borderRadius,
        borderColor: '#000000',
        borderWidth: '2px',
        backgroundColor: '#f5f5f5',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: '100%',
        },
      },

      location: {
        position: 'relative',
        height: '100%',
        borderRadius: theme.shape.borderRadius,
        borderColor: '#000000',
        borderWidth: '2px',
        marginLeft: '200px',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
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
      locationIcon: {
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
        height: '100%'
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },  
      menuButton: {
        marginRight: theme.spacing(10),
      },
      grow: {
          flexGrow:1
      }  
})

const Header = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu'

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          id={menuId}
          keepMounted
          getContentAnchorEl={null}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      );
  

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
                            <Grid item >
                                <div className={classes.location}>
                                    <div className={classes.locationIcon}>
                                        <LocationOnOutlined />
                                    </div>
                                    <InputBase
                                        placeholder="Select City"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                    <Grid item xs={8} >
                        <Grid container justify='flex-end' alignItems='center' direction='row' className={classes.container} >
                            <Grid item className={classes.headerLinks}>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchOutlined />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                            </Grid>

                            <Grid item className={classes.headerLinks}>
                                <IconButton aria-label="show 17 new notifications" color="inherit" paddingLeft={3}>
                                    <Badge badgeContent={17} color="secondary">
                                        <Notifications />
                                    </Badge>
                                </IconButton>
                            </Grid>
                            <Grid item className={classes.headerLinks}>
                                <IconButton component={NavLink}  to='/mycart' aria-label="show 4 cart Items" color="inherit" paddingLeft={3}>
                                    <Badge badgeContent={4} color="secondary">
                                        <ShoppingCartOutlined />
                                    </Badge>
                                </IconButton>
                            </Grid>
                            <Grid item className={classes.headerLinks}>
                                <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true"  onClick={handleProfileMenuOpen} color="inherit">
                                    <AccountCircle />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        {renderMenu}
    </div>
    )
}
export default Header
