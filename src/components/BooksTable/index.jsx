import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

import Pages from "./Pages";
import CartContext from "../../context/CartContext";
import ExportedPagination from "./Pagination";

const BooksTable = () => {
  const { cart, setCart } = useContext(CartContext);
  const [unmutableProducts, setUnmutableProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [ascPrice, setAscPrice] = useState(false);
  const [ascRating, setAscRating] = useState(false);

  const sortPrice = () => {
    let temp = products;
    temp.sort(function (a, b) {
      if (ascPrice) {
        return a.price - b.price;
      } else return b.price - a.price;
    });
    setAscPrice(!ascPrice);
    setProducts(temp);
  };

  const sortRating = () => {
    let temp = products;
    temp.sort(function (a, b) {
      if (ascRating) {
        return a.ratings_count - b.ratings_count;
      } else return b.ratings_count - a.ratings_count;
    });
    setAscRating(!ascRating);
    setProducts(temp);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
      );
      setUnmutableProducts(res.data);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearch = (e) => {
    e.preventDefault();
    let temp = [];
    for (let i in unmutableProducts) {
      if (
        unmutableProducts[i].title
          .toString()
          .trim()
          .toLowerCase()
          .includes(searchText.toString().trim().toLowerCase())
      ) {
        temp.push(unmutableProducts[i]);
      }
    }
    setProducts(temp);
  };

  const handleAddToCart = (item) => {
    let temp = [];
    for (let ele in cart) {
      temp.push(cart[ele]);
    }
    temp.push(item);

    localStorage.setItem("cart", JSON.stringify(temp));
    setCart(temp);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Container
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Form inline onSubmit={(e) => handleSearch(e)}>
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="mr-sm-3"
          />
          <Button type="submit">Search</Button>
        </Form>
      </Container>
      <Pages
        ascPrice={ascPrice}
        ascRating={ascRating}
        sortRating={sortRating}
        sortPrice={sortPrice}
        products={currentPosts}
        loading={loading}
        handleAddToCart={handleAddToCart}
      />
      <ExportedPagination
        postsPerPage={postsPerPage}
        totalPosts={products.length}
        paginate={paginate}
        currentPageNumber={currentPage}
      />
    </>
  );
};

export default BooksTable;
