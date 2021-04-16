import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MenuItem,Menu,List,ListItem,ListItemText } from '@material-ui/core';
import serverUrl from "../../serverURL";
import { render } from 'react-dom';
import axios from "axios";
var FormData = require('form-data');

const roles = [
  'Customer',
  'Retailer',
  'Wholesaler',
];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  copyright:{
      marginBottom: theme.spacing(8)
  },
  floatingLabelFocusStyle: {
    color: theme.palette.text.hint
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignUp() {
  const classes = useStyles();
  const [jwt, setJWT] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [role, setRole] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState(''); 
  const [phone, setPhone] = useState('');

  const payload = {
    username: username,
    user_type: role,
    name: name,
    mail: mail,
    phno: phone,
    wallet: 0
  };

  const handleSubmit=()=>{
    JSON.stringify(payload);
    var data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('password2', password2);
    var config = {
      method: 'post',
      url: serverUrl+'/account/register/',
      data : data
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      var config2 = {
        method: 'post',
        url: serverUrl+'/account/users/',
        headers: { 
          'Authorization': `JWT ${response.data.token}`,
          'Content-Type': 'application/json'
        },
        data : payload
      };
      axios(config2)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    }).catch(function (error) {
      console.log(error);
    });
  }
  const handleName=(e)=>{
    setName(e.target.value);
  }
  const handleUsername=(e)=>{
    setUsername(e.target.value);
  }
  const handleEmail=(e)=>{
    setMail(e.target.value);
  }
  const handleMobNo=(e)=>{
    setPhone(e.target.value);
  }
  const handlePass=(e)=>{
    setPassword(e.target.value);
  }
  const handleConfirmPass=(e)=>{
    setPassword2(e.target.value);
  }

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  }
  
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setRole(index);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  // React.useEffect(() => {
  //   return () => (
  //     cleanup
  //   )
  // }, [])
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6} >
              <TextField
                autoComplete="userName"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Usename"
                autoFocus
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle
                }}
                onChange={handleUsername}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle
                }}
                onChange={handleName}
              />
            </Grid>
            <Grid item xs={12}sm={6}>

            <List component="nav" aria-label="User Type">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="user-type"
                aria-label="User Type"
                onClick={handleClickListItem}
              >
                <ListItemText primary="User Role" secondary={roles[selectedIndex]} />
              </ListItem>
            </List>

            <Menu
              id="user-type"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              >
              {roles.map((option,index) => (
                  <MenuItem key={option.value} 
                  value={option.value}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                  >
                  {option}
                  </MenuItem>
              ))}
            </Menu>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle
                }}
                onChange={handleEmail}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobile"
                label="Mobile Number"
                name="mobile"
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle
                }}
                onChange={handleMobNo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle
                }}
                label="Password"
                type="password"
                id="password"
                onChange={handlePass}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                InputLabelProps={{  
                    className: classes.floatingLabelFocusStyle
                }}
                type="password"
                id="confirmpassword"
                onChange={handleConfirmPass}
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
