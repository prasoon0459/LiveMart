import {
    AppBar,
    Toolbar,
    makeStyles,
    Grid,
    Box,
    InputBase,
    IconButton,
    Badge,
  } from "@material-ui/core";
  import logo from "../img/logo.png";
  import React from "react";
  import { NavLink } from "react-router-dom";
  import {
      LocationOnOutlined,
    MenuOutlined,
    Notifications,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
  import theme from "../theme";
  
  const useStyles = makeStyles({
    headerLogo: {
      width: "50px",
      margin: theme.spacing(1, 1, 0),
    },
    container: {
      height: "100%",
    },
    bar: {
      width: "100%",
    },
    root: {
      flexGrow: 1,
      margin: theme.spacing(1, 0, 2),
    },
    search: {
      padding:theme.spacing(1,1,1),
      position: "relative",
      height: "100%",
      width: "100%",
      backgroundColor: theme.palette.background.search,
    },
  
    location: {
      
      position: "relative",
      height: "100%",
      width:'100%',
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    locationIcon: {
        padding:theme.spacing(0,1,0),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      height: "100%",
      width: "100%",
    },
    headerLinks: {
      padding: theme.spacing(1, 0, 1),
    },
    inputInput: {
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      height: '100%',
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    inputLocation: {
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create("width"),
        paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
        width: "100%",
        height: '100%',
        [theme.breakpoints.up("sm")]: {
          width: "12ch",
          "&:focus": {
            width: "20ch",
          },
        },
      },
    inputField:{
        fontSize:'20',
    },
    navButton: {
      // fontWeight:800,
      fontSize: 16,
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
    grow: {
      flexGrow: 1,
    },
    menuIcon:{
        marginLeft:theme.spacing(0)
    }
  });
  
  const HeaderMobile = () => {
    const classes = useStyles();
    return (
      <div>
        <AppBar position="static" elevation={0} color="transparent">
          <Toolbar>
            <Grid container direction="column" className={classes.root}>
              <Grid
                container
                className={classes.bar}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item >
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item className={classes.menuIcon}>
                      <IconButton>
                        <MenuOutlined></MenuOutlined>
                      </IconButton>
                    </Grid>
                    <Box component={NavLink} to="/">
                      <img
                        src={logo}
                        className={classes.headerLogo}
                        alt="app_bar_logo"
                      ></img>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Grid
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                    >
                      <Grid item xs>
                        <div className={classes.location}>
                            <div className={classes.locationIcon}>
                            <LocationOnOutlined />
                            </div>
                            <InputBase
                                placeholder="Select City"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputLocation,
                                }}
                                inputProps={{ "aria-label": "search" }}
                            />
                        </div>
                      </Grid>
                      <Grid item className={classes.headerLinks}>
                        <IconButton
                          aria-label="show 17 new notifications"
                          color="inherit"
                        >
                          <Badge badgeContent={17} color="secondary">
                            <Notifications />
                          </Badge>
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.headerLinks}>
                        <IconButton
                          component={NavLink}
                          to="/mycart"
                          aria-label="show 4 cart Items"
                          color="inherit"
                        >
                          <Badge badgeContent={4} color="secondary">
                            <ShoppingCartOutlined />
                          </Badge>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item className={classes.bar}>
                  <Grid container alignItems='center' className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchOutlined />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ "aria-label": "search" ,className: classes.inputField}}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
  
  export default HeaderMobile;
  