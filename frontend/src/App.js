import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

import { signout } from "./actions/userActions";

import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import SigninScreen from "./Screens/SigninScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch()
  const signoutHandler=()=>{
     dispatch(signout())
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazona
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name}
                  <i className="fa fa-caret-down"></i>
                  <ul className="dropdown-content">
                    <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                  </ul>
                </Link>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/signin" exact component={SigninScreen}></Route>
          <Route path="/register" exact component={RegisterScreen}></Route>
          <Route path="/shipping" exact component={ShippingAddressScreen}></Route>
        </main>
        <footer className="row center">All rights are reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
