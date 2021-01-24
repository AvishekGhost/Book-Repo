import React, { useContext, useState } from "react";
import {
  Table,
  ListGroup,
  Container,
  Button,
  Modal,
  Alert,
  Form,
  Col,
  Row,
} from "react-bootstrap";

import CartContext from "../../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const [msg, setMsg] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clearCart = () => {
    let temp = [];
    localStorage.setItem("cart", JSON.stringify(temp));
    setCart(temp);
  };

  const getTotal = () => {
    if (!cart || cart.length === 0) return 0;
    let sum = 0;
    for (let i in cart) sum += cart[i].price;
    return sum;
  };
  const getGrandTotal = () => {
    if (!cart || cart.length === 0) return 0;
    let sum = getTotal();
    sum -= (sum * 15) / 100;
    sum += 50;
    return sum;
  };

  return (
    <Container>
      <h1>Cart</h1>
      <Container>
        {msg.length > 0 ? (
          <Alert variant={msg === "Payment Successfull" ? "success" : "danger"}>
            {msg}
          </Alert>
        ) : (
          ""
        )}
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup style={{ flex: 0.23 }}>
            <ListGroup.Item disabled>
              Items: {cart ? cart.length : 0}
            </ListGroup.Item>
            <ListGroup.Item disabled>Total: ${getTotal()}</ListGroup.Item>
            <ListGroup.Item disabled>Discount: 15%</ListGroup.Item>
            <ListGroup.Item disabled>Delivery Charge: $50</ListGroup.Item>
            <ListGroup.Item>Grand Total : ${getGrandTotal()}</ListGroup.Item>
            <ListGroup.Item>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Address
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="Leilani Boyer"
                  />
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="557-6308 Lacinia Road"
                  />
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="San Bernardino ND 09289"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Phone:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="(257) 563-7401"
                  />
                </Col>
              </Form.Group>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setMsg("Payment Successfull");
              handleClose();
            }}
          >
            Pay ${getGrandTotal()}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setMsg("Payment Canceled");
              handleClose();
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="danger" onClick={clearCart}>
        Clear Cart
      </Button>
      <Container fluid className="cart-container">
        {cart.length !== 0 ? (
          <Table striped bordered hover style={{ flex: 0.75 }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Authors</th>
                <th>ISBN</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item.bookID}</td>
                    <td>
                      {item.title.toString().length > 80
                        ? item.title.toString().substring(0, 80) + "..."
                        : item.title.toString()}{" "}
                      ({item.language_code})
                    </td>
                    <td>{item.authors}</td>
                    <td>{item.isbn}</td>
                    <td>${item.price}</td>
                  </tr>
                );
              })}
            </tbody>{" "}
          </Table>
        ) : (
          <h1 style={{ flex: 0.75 }}>Your cart is empty</h1>
        )}

        <ListGroup variant="flush" style={{ flex: 0.23 }}>
          <ListGroup.Item disabled>
            Items: {cart ? cart.length : 0}
          </ListGroup.Item>
          <ListGroup.Item disabled>Total: ${getTotal()}</ListGroup.Item>
          <ListGroup.Item disabled>Discount: 15%</ListGroup.Item>
          <ListGroup.Item disabled>Delivery Charge: $50</ListGroup.Item>
          <ListGroup.Item>Grand Total : ${getGrandTotal()}</ListGroup.Item>
          {msg !== "Payment Successfull" && (
            <ListGroup.Item active action onClick={handleShow}>
              Checkout
            </ListGroup.Item>
          )}
        </ListGroup>
      </Container>
    </Container>
  );
}

export default Cart;
