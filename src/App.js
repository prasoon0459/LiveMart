import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Header from './Components/Headers/HeaderSignedIn'
import Home from './Components/Home/Home';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import ForgotPassword from './Components/Auth/ForgotPwd';
import { Box, Typography } from '@material-ui/core';
import HeaderMobile from './Components/Headers/HeaderMobile';
import UseWindowDimensions from './utils/UseWindowDimensions';


const App =() =>{
    const screen = UseWindowDimensions().screen;
    const mobileHeader= screen==='sm'||screen==='xs'


    function getHeader() {
      return mobileHeader?<HeaderMobile/>:<Header/> 
    }


    function Copyright() {
      return (
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <span component={Link} to="/" >
            LiveMart
          </span>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
    } 

    return (
      <BrowserRouter>  
        <div className="App">

          {getHeader()}
          <Switch>
            <Route path='/login'>   
              <SignIn></SignIn>
            </Route>
            <Route path='/signup'>
              <SignUp></SignUp>
            </Route>
            <Route path='/forgot_pwd'>
              <ForgotPassword></ForgotPassword>
            </Route>
            <Route path='/'>
              <Home></Home>
            </Route>
          </Switch>
          <Box pt={3} pb={3} style={{backgroundColor:'#f5f5f5'}}>
            <Copyright />
          </Box>
        </div>
      </BrowserRouter>
  );
}
export default App;
