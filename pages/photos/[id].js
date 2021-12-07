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
        <main>
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
                        <BsFillHandThumbsUpFill />
                        {` `}
                        {`${image.likes} likes`}
                      </p>
                    </div>
                    <div className="likes d-flex align-items-center justify-content-center">
                      <p className="px-2">
                        <BsFillEyeFill /> {image.views}
                      </p>
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
