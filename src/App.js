import "./App.css";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Header from "./Components/Headers/HeaderSignedIn";
import Home from "./Components/Home/Home";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import ForgotPassword from "./Components/Auth/ForgotPwd";
import { Box, Typography } from "@material-ui/core";
import HeaderMobile from "./Components/Headers/HeaderMobile";
import UseWindowDimensions from "./utils/UseWindowDimensions";
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
import ViewPickup from "./Components/Order/ViewPickup";
import Inventory from "./Components/Inventory/Inventory";
import AddItem from "./Components/Inventory/AddItem";
import DeliveryHome from "./Components/Delivery/DeliveryHome";
import Filter from "./Components/Search/Filter";

const App = () => {
  const screen = UseWindowDimensions().screen;
  const mobileHeader = screen === "sm" || screen === "xs";
  const [token, setToken] = React.useState("");
  const [user, setUser] = React.useState(localStorage.getItem("token"));

  const handleToken = (props) => {
    setToken(props);
    setUser(props);
    console.log(props);
  };

  function getHeader() {
    return user ? (
      mobileHeader ? (
        <HeaderMobile handleLogout={handleLogout} />
      ) : (
        <Header handleLogout={handleLogout} />
      )
    ) : (
      <div></div>
    );
  }

  const handleLogout = (history) => {
    localStorage.clear();
    setUser(null);
    history.push("/login");
  };

  function AuthenticatedComponent(component) {
    return user ? component : <SignIn handleToken={handleToken}></SignIn>;
  }
  function UnauthenticatedComponent(component) {
    return user ? (
      <div>
        {getHeader()}
        <Home></Home>
      </div>
    ) : (
      component
    );
  }

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
          <Route path="/login">
            {UnauthenticatedComponent(
              <SignIn handleToken={handleToken}></SignIn>
            )}
          </Route>
          <Route path="/signup">{UnauthenticatedComponent(<SignUp />)}</Route>
          <Route path="/forgot_pwd">
            {UnauthenticatedComponent(<ForgotPassword />)}
          </Route>
          <Route path="/change_pwd">
            {UnauthenticatedComponent(<ChangePwd />)}
          </Route>

          <Route path="/delivery_home">
            {AuthenticatedComponent(<DeliveryHome></DeliveryHome>)}
          </Route>
          <Route path="/add_item">
            {getHeader()}
            {AuthenticatedComponent(<AddItem></AddItem>)}
          </Route>
          <Route path="/my_inventory">
            {getHeader()}
            {AuthenticatedComponent(<Inventory></Inventory>)}
          </Route>
          <Route path="/myProfile">
            {getHeader()}
            {AuthenticatedComponent(<Profile token={token} />)}
          </Route>
          <Route path="/mycart">
            {/* components={(getHeader(), AuthenticatedComponent(Cart))} */}
            {getHeader()}
            {AuthenticatedComponent(<Cart></Cart>)}
          </Route>
          <Route path="/notifs">
            {getHeader()}
            {AuthenticatedComponent(<Notifs></Notifs>)}
          </Route>
          <Route
            path="/track"
            component={(getHeader(), AuthenticatedComponent(TrackOrder))}
          />
          {/* {getHeader()}
            {AuthenticatedComponent(<TrackOrder></TrackOrder>)}
          </Route> */}
          <Route path="/track" component={(getHeader(), TrackOrder)} />
          {/* {getHeader()} */}
          {/* <TrackOrder></TrackOrder> */}
          {/* </Route> */}
          <Route
            path="/pickup"
            component={(getHeader(), AuthenticatedComponent(ViewPickup))}
          />
          {/* {getHeader()}
            <ViewPickup></ViewPickup>
          </Route> */}
          <Route path="/seller_view_order">
            {getHeader()}
            {AuthenticatedComponent(<SellerViewOrder></SellerViewOrder>)}
          </Route>

          <Route path="/orders">
            {getHeader()}
            {AuthenticatedComponent(<Orders></Orders>)}
          </Route>
          <Route path="/reviews">
            {getHeader()}
            {AuthenticatedComponent(<MyReviews></MyReviews>)}
          </Route>
          <Route path="/wallet">
            {getHeader()}
            {AuthenticatedComponent(<Wallet></Wallet>)}
          </Route>
          <Route path="/search">
            {getHeader()}
            {AuthenticatedComponent(<Search />)}
          </Route>
          <Route path="/categories">
            {getHeader()}
            {AuthenticatedComponent(<Categories />)}
          </Route>
          <Route
            path="/checkout"
            component={AuthenticatedComponent(Checkout)}
          />
          <Route path="/product">
            {getHeader()}
            {AuthenticatedComponent(<Product />)}
          </Route>
          <Route path="/">
            {getHeader()}
            {AuthenticatedComponent(<Home />)}
          </Route>
        </Switch>
        <Box pt={3} pb={3}>
          <Copyright />
        </Box>
      </div>
    </BrowserRouter>
  );
};
export default App;
