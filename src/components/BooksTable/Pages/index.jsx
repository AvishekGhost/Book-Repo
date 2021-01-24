import React, { useState } from "react";
import { Table, Button, Form, Container, Spinner, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import StarRating from "react-rating-stars-component";

import "./Pages.css";

const Pages = ({
  handleAddToCart,
  products,
  loading,
  sortPrice,
  sortRating,
  ascRating,
  ascPrice,
}) => {
  const [showId, setShowId] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [showAuthors, setShowAuthors] = useState(true);
  const [showAverageRating, setShowAverageRating] = useState(true);
  const [showISBN, setShowISBN] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  return (
    <Container fluid>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Container>
          <Form style={{ marginTop: 20 }}>
            <Form.Group
              controlId="formBasicCheckbox"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              <Form.Check
                onChange={() => {
                  setShowId(!showId);
                }}
                type="checkbox"
                label="ID"
                checked={showId}
              />
              <Form.Check
                onChange={() => {
                  setShowTitle(!showTitle);
                }}
                type="checkbox"
                label="Title"
                checked={showTitle}
              />
              <Form.Check
                onChange={() => {
                  setShowAuthors(!showAuthors);
                }}
                type="checkbox"
                label="Authors"
                checked={showAuthors}
              />
              <Form.Check
                onChange={() => {
                  setShowAverageRating(!showAverageRating);
                }}
                type="checkbox"
                label="Rating"
                checked={showAverageRating}
              />
              <Form.Check
                onChange={() => {
                  setShowISBN(!showISBN);
                }}
                type="checkbox"
                label="ISBN"
                checked={showISBN}
              />

              <Form.Check
                onChange={() => {
                  setShowPrice(!showPrice);
                }}
                type="checkbox"
                label="Price"
                checked={showPrice}
              />
            </Form.Group>
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr>
                {showId && (
                  <th>
                    <Nav.Link disabled>ID</Nav.Link>
                  </th>
                )}
                {showTitle && (
                  <th>
                    <Nav.Link disabled>Title</Nav.Link>
                  </th>
                )}
                {showAuthors && (
                  <th>
                    <Nav.Link disabled>Authors</Nav.Link>
                  </th>
                )}
                {showAverageRating && (
                  <th>
                    <Nav.Link
                      onClick={sortRating}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Rating{" "}
                      <div
                        style={{
                          paddingTop: 2,
                          paddingLeft: 2,
                        }}
                      >
                        {!ascRating ? (
                          <FontAwesomeIcon
                            size="1x"
                            icon={faArrowAltCircleUp}
                          />
                        ) : (
                          <FontAwesomeIcon
                            size="1x"
                            icon={faArrowAltCircleDown}
                          />
                        )}
                      </div>
                    </Nav.Link>
                  </th>
                )}
                {showISBN && (
                  <th>
                    <Nav.Link disabled>ISBN</Nav.Link>
                  </th>
                )}
                {showPrice && (
                  <th>
                    <Nav.Link
                      onClick={sortPrice}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Price{" "}
                      <div
                        style={{
                          paddingTop: 2,
                          paddingLeft: 2,
                        }}
                      >
                        {!ascPrice ? (
                          <FontAwesomeIcon
                            size="1x"
                            icon={faArrowAltCircleUp}
                          />
                        ) : (
                          <FontAwesomeIcon
                            size="1x"
                            icon={faArrowAltCircleDown}
                          />
                        )}
                      </div>
                    </Nav.Link>
                  </th>
                )}
                <th>
                  <Nav.Link disabled>Add</Nav.Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, key) => {
                return (
                  <tr key={key}>
                    {showId && <td>{item.bookID}</td>}
                    {showTitle && (
                      <td>
                        {item.title.toString().length > 80
                          ? item.title.toString().substring(0, 80) + "..."
                          : item.title.toString()}{" "}
                        ({item.language_code})
                      </td>
                    )}
                    {showAuthors && <td>{item.authors}</td>}
                    {showAverageRating && (
                      <td>
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ width: "55px" }}>
                            <StarRating
                              count={5}
                              isHalf={true}
                              value={item.average_rating}
                              size={13}
                            />
                          </div>
                          <p>({item.ratings_count})</p>
                        </span>
                      </td>
                    )}
                    {showISBN && <td>{item.isbn}</td>}
                    {showPrice && <td>${item.price}</td>}
                    <td>
                      <Button onClick={() => handleAddToCart(item)}>
                        <FontAwesomeIcon
                          color="white"
                          size="1x"
                          icon={faPlus}
                        />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      )}
    </Container>
  );
};

export default Pages;
