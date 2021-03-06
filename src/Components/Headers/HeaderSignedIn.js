/* eslint-disable */

import {
  AppBar,
  Toolbar,
  makeStyles,
  Grid,
  Box,
  InputBase,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import logo from "../../img/logo.png";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  AccountCircle,
  Assignment,
  ExitToApp,
  Folder,
  LocationOnOutlined,
  // Notifications,
  Person,
  PostAdd,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import theme from "../../theme";
import axios from "axios";
import serverUrl from "../../serverURL";

const useStyles = makeStyles({
  headerLogo: {
    width: "80px",
  },
  toolbar: {
    padding: theme.spacing(0, 0, 0),
  },
  container: {
    height: "100%",
  },
  headerLinks: {
    padding: theme.spacing(1, 1, 1),
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 2, 1),
    backgroundColor: theme.palette.background.paper,
  },
  search: {
    padding: theme.spacing(1, 1, 1),
    position: "relative",
    height: "100%",
    backgroundColor: theme.palette.background.search,
    width: "100%",
    borderRadius: 10,
  },

  location: {
    position: "relative",
    height: "100%",
    marginLeft: "200px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  locationIcon: {
    padding: theme.spacing(0, 2),
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
  bar: {
    flexGrow: 1,
    margin: theme.spacing(0, 3, 0),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
  },
  inputRootLocation: {
    color: "inherit",
    height: "100%",
  },
  inputInputLocation: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "12ch",
  },
  menuIcon: {
    margin: theme.spacing(0, 1, 0),
  },
  menuButton: {
    marginRight: theme.spacing(10),
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
});

const Header = ({ handleLogout }) => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [, setMobileMoreAnchorEl] = React.useState(null);
  //const [locData,setLocData]=React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const user_type = localStorage.getItem("usertype");

  const [cartNo, setCartNo] = React.useState(0);

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

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      const params = new URLSearchParams();
      console.log(event.target.value);
      if (event.target.value) {
        params.append("q", event.target.value);
        history.push({ pathname: "/search", search: params.toString() });
      }
    }
  };

  const getCartItems = () => {
    var config = {
      method: "get",
      url: serverUrl + "/cart/?u=" + username + "&a=Active",
      headers: {
        Authorization: "JWT " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.length > 0) {
          setCartNo(response.data.length);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (user_type === "0" || user_type === "1") getCartItems();
  }, []);

  const menuId = "primary-search-account-menu";

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
      <MenuItem onClick={handleMenuClose} component={NavLink} to="/myProfile">
        <Person className={classes.menuIcon} />
        <Typography>My Profile</Typography>
      </MenuItem>
      {(user_type === "0" || user_type === "1") && (
        <MenuItem onClick={handleMenuClose} component={NavLink} to="/orders">
          <Folder className={classes.menuIcon}></Folder>
          <Typography>My Orders</Typography>
        </MenuItem>
      )}
      {(user_type === "1" || user_type === "2") && (
        <MenuItem
          onClick={handleMenuClose}
          component={NavLink}
          to="/orders_from_me"
        >
          <Folder className={classes.menuIcon}></Folder>
          <Typography>Orders from Me</Typography>
        </MenuItem>
      )}
      {(user_type === "1" || user_type === "2") && (
        <MenuItem
          onClick={handleMenuClose}
          component={NavLink}
          to="/my_inventory"
        >
          <Assignment className={classes.menuIcon} />
          <Typography>My Inventory</Typography>
        </MenuItem>
      )}
      {user_type === "2" && (
        <MenuItem onClick={handleMenuClose} component={NavLink} to="/add_item">
          <PostAdd className={classes.menuIcon} />
          <Typography>Add to Inventory</Typography>
        </MenuItem>
      )}
      <MenuItem onClick={() => handleLogout(history)}>
        <ExitToApp className={classes.menuIcon}></ExitToApp>
        <Typography>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar elevation={0} color="transparent" position="relative">
        <Toolbar className={classes.toolbar}>
          <Grid container className={classes.root} direction="row">
            <Box>
              <Grid container justify="flex-start" alignItems="center">
                <Box component={NavLink} to="/">
                  <img
                    src={logo}
                    className={classes.headerLogo}
                    alt="app_bar_logo"
                  ></img>
                </Box>
                <Grid item>
                  <div className={classes.location}>
                    <div className={classes.locationIcon}>
                      <LocationOnOutlined />
                    </div>
                    <InputBase
                      placeholder="Select City"
                      classes={{
                        root: classes.inputRootLocation,
                        input: classes.inputInputLocation,
                      }}
                      inputProps={{ "aria-label": "search" }}
                    />
                  </div>
                </Grid>
                <Grid item className={classes.headerLinks}>
                  <Button
                    component={NavLink}
                    to={
                      user_type === "0" || user_type === "1"
                        ? "/categories"
                        : user_type === "2"
                        ? "/my_inventory"
                        : "/"
                    }
                    color="inherit"
                    paddingLeft={3}
                  >
                    <Typography className={classes.navButton}>
                      {user_type === "0" || user_type === "1"
                        ? "Categories"
                        : user_type === "2"
                        ? "My Inventory"
                        : "/"}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.grow}>
              <Grid
                container
                justify="flex-end"
                alignItems="center"
                direction="row"
                className={classes.container}
              >
                {(user_type === "0" || user_type === "1") && (
                  <Grid item className={classes.bar}>
                    <Grid
                      container
                      alignItems="center"
                      className={classes.search}
                    >
                      <div className={classes.searchIcon}>
                        <SearchOutlined />
                      </div>
                      <InputBase
                        placeholder="Search???"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                        onKeyPress={handleSearchSubmit}
                      />
                    </Grid>
                  </Grid>
                )}

                {(user_type === "0" || user_type === "1") && (
                  <Grid item className={classes.headerLinks}>
                    <IconButton
                      component={NavLink}
                      to="/mycart"
                      aria-label="show cart Items"
                      color="inherit"
                      paddingLeft={3}
                    >
                      <Badge
                        badgeContent={cartNo > 0 ? cartNo : null}
                        color="secondary"
                      >
                        <ShoppingCartOutlined />
                      </Badge>
                    </IconButton>
                  </Grid>
                )}
                <Grid item className={classes.headerLinks}>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};
export default Header;
