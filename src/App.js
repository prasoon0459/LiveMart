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
import Cart from './Components/Cart/Cart';
import Quantity from './utils/Quantity'
import Reviews from './Components/Product/Reviews';


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
              <Filter></Filter>
            </Route>
            <Route path='/change_pwd'>
              <ChangePwd></ChangePwd>
            </Route>
            <Route path='/mycart'>   
            {getHeader()}
              <Cart></Cart>
            </Route>

            <Route path='/rvw'>
              
            <Reviews></Reviews>
            </Route>

            <Route path='/search'>   
            {getHeader()}
              <Search></Search>
            </Route>
            <Route path='/categories'>   
            {getHeader()}
              <Categories></Categories>
            </Route>
            <Route path='/product'>   
            {getHeader()}
              <Product></Product>
            </Route>
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
            {getHeader()}
              <Home></Home>
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
