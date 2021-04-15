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
import Filter from './Components/Search/Filter'
import Test from './Components/Search/Test';
import Search from './Components/Search/Search';
import Product from './Components/Product/Product';
import ChangePwd from './Components/Auth/ChangePwd';
import Categories from './Components/Categories/Categories';
import Profile from './Components/Profile/Profile;
import Cart from './Components/Cart/Cart';
import Quantity from './utils/Quantity'
import Reviews from './Components/Product/Reviews';
import Notifs from './Components/Notifs/Notifs';
import Orders from './Components/Order/Orders';

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

          
          <Switch>
          <Route path='/filter'>
          {getHeader()}   
              <Filter/>
            </Route>
            <Route path='/change_pwd'>
              <ChangePwd/>
            </Route>
            <Route path='/myProfile'>
            {getHeader()} 
              <Profile/>
            </Route>
            <Route path='/mycart'>   
            {getHeader()}
              <Cart></Cart>
            </Route>

            <Route path='/test'>
              <Notifs></Notifs>
            </Route>
            <Route path='/orders'>
              {getHeader()}
              <Orders></Orders>
            </Route>
            <Route path='/search'>   
            {getHeader()}
              <Search/>
            </Route>
            <Route path='/categories'>   
            {getHeader()}
              <Categories/>
            </Route>
            <Route path='/product'>   
            {getHeader()}
              <Product/>
            </Route>
            <Route path='/login'>   
              <SignIn/>
            </Route>
            <Route path='/signup'>
              <SignUp/>
            </Route>
            <Route path='/forgot_pwd'>
              <ForgotPassword/>
            </Route>
            <Route path='/'>
            {getHeader()}
              <Home/>
            </Route>
          </Switch>
          <Box pt={3} pb={3}>
            <Copyright />
          </Box>
        </div>
      </BrowserRouter>
  );
}
export default App;
