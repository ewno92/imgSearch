import React from "react";
import Layout from "../../components/Layout";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import { authenticate } from "pixabay-api";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const { searchImages } = authenticate(PIXABAY_API_KEY);

const Photo = ({ images }) => {
  const image = images.hits[0];
  console.log(image);
  return (
    <div id="photo-page">
      <Layout>
        <main className="mt-3">
          <Container>
            <Row>
              <Col md={8}>
                <Image
                  className="py-3"
                  src={image.webformatURL}
                  width={image.webformatWidth}
                  height={image.webformatHeight}
                  alt={image.tags}
                />
              </Col>
              <Col md={4}>
                <Row>
                  <Col>
                    <div className="uploader-container d-flex align-items-center">
                      <img src={image.userImageURL} alt="" />
                      <p className="px-3">{`${image.user}`}</p>
                    </div>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex">
                    <div className="likes d-flex align-items-center justify-content-center">
                      <p className="px-2">
                        <BsFillHandThumbsUpFill className="mb-1" />
                        {` `}
                        {`${image.likes} likes`}
                      </p>
                    </div>
                    <div className="likes mx-2 d-flex align-items-center justify-content-center">
                      <p className="px-2">
                        <BsFillEyeFill className="mb-1" /> {image.views}
                      </p>
                    </div>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <div className="download-container">
                      <a href={image.largeImageURL} download="photo.jpg">
                        <button>Download</button>
                      </a>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </main>
      </Layout>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  const images = await searchImages("", { id: id });
  return {
    props: {
      images,
    },
  };
};

export default Photo;
