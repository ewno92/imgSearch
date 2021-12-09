import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
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

  const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

  const fetchImages = (pageNumber, keyword) => {
    const URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${keyword}&image_type=photo&per_page=12&page=${pageNumber}`;
    console.log(URL);
    axios
      .get(URL)
      .then((res) => {
        console.log(res.data.hits);
        setImagesArray([...imagesArray, ...res.data.hits]);
        setTotalPages(res.data.totalHits / res.data.hits.length);
      })
      .catch((err) => console.log(err));
  };

  // function to fetch images based on the
  useEffect(() => {
    fetchImages(pageNum, search);
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
    setImagesArray([], () => {
      setTotalPages(0, () => {
        setPageNum(0, () => {
          fetchImages(1, search);
        });
      });
    });
    // setTotalPages(0);
    // fetchImages(1, search);
  };

  if (imagesArray.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <Container
        fluid
        style={{
          backgroundImage: `url(${
            imagesArray[Math.floor(Math.random() * imagesArray.length)]
              .webformatURL
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "600px",
        }}
      >
        <Row style={{ height: "600px" }}>
          <Col className="align-self-center">
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
              loadMore={() => fetchImages(++pageNum, search)}
              hasMore={pageNum < totalPages ? true : false}
            >
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
              >
                {imagesArray.map((image, index) => (
                  <div
                    key={index}
                    className="img-container px-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push(`/photos/${image.id}`);
                    }}
                  >
                    <Img sylte={{ cursor: "pointer" }} {...image} />
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
