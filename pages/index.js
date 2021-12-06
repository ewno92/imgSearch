import Head from "next/head";
import Image from "next/image";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import Gallery from "../components/Gallery";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import { authenticate } from "pixabay-api";
//redux
import { actionCreator } from "../redux/actions/actionsCreator";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const { searchImages, searchVideos } = authenticate(PIXABAY_API_KEY);
const Index = () => {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("images");
  const [imgs, setImgs] = useState({});

  // console.log(images);

  //redux
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const { increment, decrement } = bindActionCreators(actionCreator, dispatch);
  // console.log("counter: ", counter);

  const handleKeyword = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const fetchImages = async () => {
    setIsLoading(true);
    fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setImgs(data);
        setIsLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages();
  };

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=`)
      .then((response) => response.json())
      .then((data) => {
        setImgs(data);
        setIsLoading(false);
      });
  }, []);

  if (!imgs) return <div>Loading...</div>;

  return (
    <Layout>
      {/* redux */}
      {/* <button onClick={() => increment(5)}>+</button>
      <button onClick={() => decrement(5)}>-</button> */}
      <button onClick={() => console.log(imgs)}>asd</button>
      <main>
        <Container className="w-100">
          <Row>
            <Col>
              <SearchBar
                search={search}
                handleKeyword={handleKeyword}
                handleSubmit={handleSubmit}
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row data-masonry={`{"percentPosition": ${true}}`}>
            <Gallery images={imgs} />
          </Row>
        </Container>
      </main>
    </Layout>
  );
};

export default Index;
