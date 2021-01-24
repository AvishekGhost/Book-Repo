import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CartContext from "./context/CartContext";

import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ExportedNavbar from "./components/Navbar";

//http://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json
const saved_state = JSON.parse(localStorage.getItem("cart"));

function App() {
  const [cart, setCart] = useState(saved_state ? saved_state : []);

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cart, setCart }}>
        <div className="App">
          <ExportedNavbar cart={cart} />
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/cart" exact component={Cart} />
          </Switch>
        </div>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
