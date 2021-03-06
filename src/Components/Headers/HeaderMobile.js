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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core";

import serverUrl from "../../serverURL";
import clsx from "clsx";
import logo from "../../img/logo.png";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  LocationOnOutlined,
  MenuSharp,
  ExitToApp,
  // Notifications,
  SearchOutlined,
  ShoppingCartOutlined,
  FolderSharp,
  PersonSharp,
  CategorySharp,
  AssignmentSharp,
  PostAdd,
} from "@material-ui/icons";
import theme from "../../theme";
import axios from "axios";

const useStyles = makeStyles({
  headerLogo: {
    width: "50px",
    margin: theme.spacing(1, 0, 0),
  },
  container: {
    height: "100%",
  },
  bar: {
    width: "100%",
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 1, 2),
    backgroundColor: theme.palette.background.paper,
  },
  search: {
    padding: theme.spacing(1, 1, 1),
    position: "relative",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    backgroundColor: theme.palette.background.search,
  },
  drawerLogo: {
    margin: theme.spacing(3, 5, 0),
  },
  location: {
    position: "relative",
    height: "100%",
    width: "auto",
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toolbar: {
    padding: theme.spacing(0, 0, 0),
  },
  locationIcon: {
    padding: theme.spacing(0, 1, 0),
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
    width: "100%",
    height: "100%",
  },
  inputLocation: {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    height: "100%",
  },
  inputField: {
    fontSize: "20",
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
  menuIcon: {
    marginLeft: theme.spacing(0),
  },
});

const HeaderMobile = ({ handleLogout }) => {
  const history = useHistory();
  const classes = useStyles();
  const [drawerState, setState] = React.useState(false);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const user_type = localStorage.getItem("usertype");
  const [cartNo, setCartNo] = React.useState(0);

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
        // console.log(JSON.stringify(response.data));
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

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...drawerState, [anchor]: open });
  };
  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      const params = new URLSearchParams();
      if (event.target.value) {
        params.append("q", event.target.value);
        history.push({ pathname: "/search", search: params.toString() });
      }
    }
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <img
        className={classes.drawerLogo}
        src={logo}
        width="150px"
        alt="logo"
      ></img>
      <List>
        <ListItem button key="my_profile" component={NavLink} to="/myProfile">
          <ListItemIcon>
            <PersonSharp color="primary" />{" "}
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
        {(user_type === "0" || user_type === "1") && (
          <ListItem
            button
            key="categories"
            component={NavLink}
            to="/categories"
          >
            <ListItemIcon>
              <CategorySharp color="primary"></CategorySharp>
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
        )}
        {(user_type === "0" || user_type === "1") && (
          <ListItem button key="my_orders" component={NavLink} to="/orders">
            <ListItemIcon>
              <FolderSharp color="primary"></FolderSharp>
            </ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItem>
        )}
        {(user_type === "1" || user_type === "2") && (
          <ListItem
            button
            key="my_inventory"
            component={NavLink}
            to="/my_inventory"
          >
            <ListItemIcon>
              <AssignmentSharp color="primary"></AssignmentSharp>
            </ListItemIcon>
            <ListItemText primary="My Inventory" />
          </ListItem>
        )}
        {(user_type === "1" || user_type === "2") && (
          <ListItem
            button
            key="orders_from_me"
            component={NavLink}
            to="/orders_from_me"
          >
            <ListItemIcon>
              <FolderSharp color="primary"></FolderSharp>
            </ListItemIcon>
            <ListItemText primary="Orders from Me" />
          </ListItem>
        )}
        {user_type === "2" && (
          <ListItem button key="add" component={NavLink} to="/add_item">
            <ListItemIcon>
              <PostAdd color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add to Inventory" />
          </ListItem>
        )}
        <ListItem onClick={() => handleLogout(history)} button key="logout">
          <ListItemIcon>
            <ExitToApp color="primary"></ExitToApp>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar className={classes.toolbar}>
          <Grid container direction="column" className={classes.root}>
            <Grid
              container
              className={classes.bar}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <React.Fragment key={"left"}>
                    <IconButton onClick={toggleDrawer("left", true)}>
                      <MenuSharp color="primary"></MenuSharp>
                    </IconButton>
                    <SwipeableDrawer
                      anchor={"left"}
                      open={drawerState["left"]}
                      onClose={toggleDrawer("left", false)}
                      onOpen={toggleDrawer("left", true)}
                    >
                      {list("left")}
                    </SwipeableDrawer>
                  </React.Fragment>
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

                    {(user_type === "0" || user_type === "1") && (
                      <Grid item className={classes.headerLinks}>
                        <IconButton
                          component={NavLink}
                          to="/mycart"
                          aria-label="show cart Items"
                          color="inherit"
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
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            {(user_type === "0" || user_type === "1") && (
              <Grid container>
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
                      onKeyPress={handleSearchSubmit}
                      inputProps={{
                        "aria-label": "search",
                        className: classes.inputField,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderMobile;
