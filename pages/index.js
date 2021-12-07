import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "./api/pixabay";
import Img from "../components/Img";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroller";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";

let pageNum = 1;

const App = () => {
  const router = useRouter();
  const [imagesArray, setImagesArray] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("images");
  const [imgs, setImgs] = useState({});

  const fetchImages = (pageNumber) => {
    API.get("/", { params: { page: pageNumber } })
      .then((res) => {
        console.log(res.data);
        setImagesArray([...imagesArray, ...res.data.hits]);
        setTotalPages(res.data.totalHits / res.data.hits.length);
      })
      .catch((err) => console.log(err));
  };

  // function to fetch images based on the
  useEffect(() => {
    fetchImages(pageNum);
  }, []);

  const breakpointColumnsObj = {
    default: 6,
    1200: 3,
    992: 3,
    768: 2,
    576: 1,
  };

  const handleKeyword = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };
  const handleSelect = (e) => {
    setSelect(e.target.value);
    console.log(search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages(1);
  };

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <SearchBar
              search={search}
              select={select}
              setSelect={setSelect}
              handleKeyword={handleKeyword}
              handleSelect={handleSelect}
              handleSubmit={handleSubmit}
            />
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col md={12}>
            <InfiniteScroll
              pageStart={0}
              loadMore={() => fetchImages(++pageNum)}
              hasMore={pageNum < totalPages ? true : false}
            >
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
              >
                {imagesArray.map((image) => (
                  <div
                    className="img-container px-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push(`/photos/${image.id}`);
                    }}
                  >
                    <Img
                      sylte={{ cursor: "pointer" }}
                      key={image.id}
                      {...image}
                    />
                  </div>
                ))}
              </Masonry>
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default App;
