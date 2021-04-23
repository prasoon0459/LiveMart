import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Header from "./Components/Headers/HeaderSignedIn";
import Home from "./Components/Home/Home";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import ForgotPassword from "./Components/Auth/ForgotPwd";
import { Box, Typography } from "@material-ui/core";
import HeaderMobile from "./Components/Headers/HeaderMobile";
import UseWindowDimensions from "./utils/UseWindowDimensions";
import Filter from "./Components/Search/Filter";
import Search from "./Components/Search/Search";
import Product from "./Components/Product/Product";
import ChangePwd from "./Components/Auth/ChangePwd";
import Categories from "./Components/Categories/Categories";
import Profile from "./Components/Profile/Profile";
import Cart from "./Components/Cart/Cart";
import React from "react";

import Notifs from "./Components/Notifs/Notifs";
import Orders from "./Components/Order/Orders";
import Wallet from "./Components/Wallet/Wallet";
import MyReviews from "./Components/MyReview/myReview";
import Checkout from "./Components/Checkout/Checkout";
import TrackOrder from "./Components/Order/TrackOrder";
import SellerViewOrder from "./Components/Order/SellerViewOrder";
import Pickups from "./Components/Home/Pickups";
import ViewPickup from "./Components/Order/ViewPickup";
import Inventory from "./Components/Inventory/Inventory";
import AddItem from "./Components/Inventory/AddItem";
import DeliveryHome from "./Components/Delivery/DeliveryHome";

const App = () => {
  const screen = UseWindowDimensions().screen;
  const mobileHeader = screen === "sm" || screen === "xs";
  const [token, setToken] = React.useState("");
  const [signedIn, setSignedIn] =React.useState(false);

  const handleToken = (props) => {
    setToken(props);
  };

  function getHeader() {
    return mobileHeader ? <HeaderMobile /> : <Header />;
  }

  React.useEffect(() => {
    const user = localStorage.getItem('token')
    if (user)
      setSignedIn(true);
  }, []);

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <span component={Link} to="/">
          LiveMart
        </span>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* AUTH */}
          <Route path="/login">
            <SignIn handleToken={handleToken}></SignIn>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/forgot_pwd">
            <ForgotPassword />
          </Route>
          <Route path="/">
            {signedIn&& getHeader()}
            {signedIn?<Home />:<SignIn/>}
          </Route>

          {signedIn&&<Route path="/delivery_home">
            <DeliveryHome></DeliveryHome>
          </Route>}
          {signedIn&&<Route path="/add_item">
            {getHeader()}
            <AddItem></AddItem>
          </Route>}
          {signedIn&&<Route path="/change_pwd">
            <ChangePwd />
          </Route>}
          {signedIn&&<Route path="/my_inventory">
            {getHeader()}
            <Inventory></Inventory>
          </Route>}
          {signedIn&&<Route path="/myProfile">
            {getHeader()}
            <Profile token={token} />
          </Route>}
          {signedIn&&<Route path="/mycart">
            {getHeader()}
            <Cart></Cart>
          </Route>}
          {signedIn&&<Route path="/notifs">
            {getHeader()}
            <Notifs></Notifs>
          </Route>}
          {signedIn&&<Route path="/track">
            {getHeader()}
            <TrackOrder></TrackOrder>
          </Route>}
          {signedIn&&<Route path="/pickup">
            {getHeader()}
            <ViewPickup></ViewPickup>
          </Route>}
          {signedIn&&<Route path="/seller_view_order">
            {getHeader()}
            <SellerViewOrder></SellerViewOrder>
          </Route>}
          {signedIn&&<Route path="/orders">
            {getHeader()}
            <Orders></Orders>
          </Route>}
          {signedIn&&<Route path="/reviews">
            {getHeader()}
            <MyReviews></MyReviews>
          </Route>}
          {signedIn&&<Route path="/wallet">
            {getHeader()}
            <Wallet></Wallet>
          </Route>}
          {signedIn&&<Route path="/search">
            {getHeader()}
            <Search />
          </Route>}
          {signedIn&&<Route path="/categories">
            {getHeader()}
            <Categories />
          </Route>}
          {signedIn&&<Route path="/checkout">
            <Checkout /> 
          </Route>}
          {signedIn&&<Route path="/product">
            {getHeader()}
            <Product />
          </Route>}
          
        </Switch>
        <Box pt={3} pb={3}>
          <Copyright />
        </Box>
      </div>
    </BrowserRouter>
  );
};
export default App;
