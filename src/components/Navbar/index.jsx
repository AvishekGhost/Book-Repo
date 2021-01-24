import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";

const iconCss = {
  marginTop: -10,
  marginLeft: -10,
  height: 20,
  backgroundColor: "pink",
  padding: 5,
  borderRadius: 50,
  alignItems: "center",
  display: "flex",
  color: "black",
  justifyContent: "center",
};

const ExportedNavbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Link to="/" className="nav-link">
        <Navbar.Brand>BookRepo</Navbar.Brand>
      </Link>
      <div className="mr-auto" />
      <Nav>
        <Link to="/cart" className="nav-link">
          <span style={{ display: "flex" }}>
            <FontAwesomeIcon
              color="dodgerBlue"
              size="2x"
              icon={faShoppingCart}
            />
            <div style={iconCss}>{cart ? cart.length : 0}</div>
          </span>
        </Link>
      </Nav>
    </Navbar>
  );
};

export default ExportedNavbar;
