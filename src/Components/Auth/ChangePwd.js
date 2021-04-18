import {React,useState} from 'react' ;
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import theme from '../../theme';
import axios from "axios";
import serverUrl from '../../serverURL';
import {
  minMaxLength,
  validEmail,
  passwordStrength,
} from './validation';
import { NavLink, useLocation } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    padding: theme.spacing(4, 4, 4),
    flexDirection: "column",
    alignItems: "center",
  },
  floatingLabelFocusStyle: {
    color: theme.palette.text.hint,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  infoContainer: {
    margin: theme.spacing(0, 1, 2),
  },
})

const ChangePwd = () => {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState({
    password: '',
    confirmPassword: ''
  });
  
  const history = useHistory();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('q');
  const username = params.get('u');

  const handlechangePassword = () => {
    if (password === password2) {
      var data = JSON.stringify({
        "username": username,
        "new_password2": password,
        "new_password": password,
        "password": password,
        "last_login": null,
        "is_superuser": false,
        "first_name": "",
        "last_name": "",
        "email": "",
        "is_staff": false,
        "is_active": false,
        "groups": [],
        "user_permissions": []
      });
      
      var config = {
        method: 'put',
        url: serverUrl+'/account/resetpassword/',
        headers: { 
          'Authorization': 'JWT ' + token, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        history.push('/login');
      })
      .catch(function (error) {
        console.log(error);
      })
    } else {
      console.log("password mismatch!");
    }
  }
  const handlePass = (e) => {
    setPassword(e.target.value);
    setError({ ...error, password: '' })
  }
  const handleConfirmPass = (e) => {
    setPassword2(e.target.value);
    setError({ ...error, confirmPassword: '' })
  }
  const handlePasswordError = () => {
    if ((minMaxLength(password, 6)))
      setError({ ...error, password: 'Must be greater than 6 character' });
    // else if (passwordStrength(password))
    //   setError({ ...error, password: 'Password is not strong enough. Include an upper case letter, a number or a special character to make it strong' });
    if (password2 !== '') {
      validateConfirmPassword(
        password,
        password2,
      );
    }
  }
  const handleConfirmPasswordError = () => {
     validateConfirmPassword(
      password,
      password2,
    );
  }
  function validateConfirmPassword(
    password,
    confirmpassword,
  ) {
    if (password !== confirmpassword) {
      setError({
        ...error, confirmPassword:
          ' Password is not matching'
      });
      return false;
    }
    else if (error['password'] !== '') {
      setError({
        ...error, confirmPassword:
          error['password']
      });
      return false;
    }
    else
      setError({
        ...error, confirmPassword:
          ''
      });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
            </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handlePass}
            onBlur={handlePasswordError}
            name="new_password"
            label="New Password"
            type="password"
            error={error['password'] !== ''}
                helperText={error['password']}
            id="new_password"
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleConfirmPass}
            onBlur={handleConfirmPasswordError}
            name="confirm_password"
            label="Confirm Password"
            error={error['confirmPassword'] !== ''}
            helperText={error['confirmPassword']}
            type="password"
            id="password"
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={error['password']!=='' || error['confirmPassword']!==''}
            onClick={handlechangePassword}
            className={classes.submit}
          >
            Change Password
              </Button>
        </form>
      </div>
    </Container>
  )

}

export default ChangePwd;