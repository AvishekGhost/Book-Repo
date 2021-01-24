import React from "react";
import { Pagination, Container } from "react-bootstrap";

const ExportedPagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPageNumber,
}) => {
  const [pageNumbers, setPageNumbers] = React.useState([]);

  React.useEffect(() => {
    let temp = currentPageNumber;

    temp -= 5;
    temp = Math.max(temp, 1);

    let newPages = [];
    for (
      let i = temp;
      i <= Math.min(temp + 10, Math.ceil(totalPosts / postsPerPage));
      i++
    ) {
      newPages.push(i);
    }
    setPageNumbers(newPages);
  }, [currentPageNumber, totalPosts, postsPerPage]);

  return (
    <Container
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pagination>
        <Pagination.First onClick={() => paginate(1)} />
        <Pagination.Prev onClick={() => paginate(currentPageNumber - 1)} />
        <Pagination.Ellipsis disabled />
        {pageNumbers.map((number) => {
          return (
            <Pagination.Item
              active={number === currentPageNumber}
              onClick={() => paginate(number)}
              key={number}
            >
              {number}
            </Pagination.Item>
          );
        })}
        <Pagination.Ellipsis disabled />
        <Pagination.Next onClick={() => paginate(currentPageNumber + 1)} />
        <Pagination.Last
          onClick={() => paginate(Math.ceil(totalPosts / postsPerPage))}
        />
      </Pagination>
    </Container>
  );
};

export default ExportedPagination;
