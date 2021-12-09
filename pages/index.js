import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Img from "../components/Img";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroller";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import Head from "next/head";

let pageNum = 1;

const App = () => {
  const router = useRouter();
  const [imagesArray, setImagesArray] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const [imgs, setImgs] = useState({});

  const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

  const fetchImages = (pageNumber, keyword) => {
    const URL = `https://pixabay.com/api/${select}?key=${PIXABAY_API_KEY}&q=${keyword}&image_type=photo&per_page=12&page=${pageNumber}`;
    console.log("URL::::", URL);
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
  };

  useEffect(() => {
    console.log(select);
  }, [select]);
  return (
    <>
      <Head>
        <title>저작권 무료 이미지 - NCI</title>
        <meta
          name="Description"
          content="NCI는 저작권이 없는 이미지를 제공합니다. NCI에서 다양한 이미지를 찾아보세요!"
        />
        <meta
          property="og:image"
          content={"https://img-search-mu.vercel.app/nci.png"}
        />
        <meta property="og:title" content="저작권 무료 이미지 - NCI" />
        <meta
          property="og:description"
          content="NCI는 저작권이 없는 이미지를 제공합니다. NCI에서 다양한 이미지를 찾아보세요!"
        />
        <meta property="og:url" content="https://img-search-mu.vercel.app/" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content="NCI" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Container
          fluid
          style={{
            backgroundImage: `url(${"./bg.jpg"})`,
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
              {!select && (
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
              )}
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default App;
