import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import { authenticate } from 'pixabay-api';
import { BsFillEyeFill } from 'react-icons/bs';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import axios from 'axios';

import { BsDownload } from 'react-icons/bs';
// BsDownload;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const { searchImages } = authenticate(PIXABAY_API_KEY);

const Photo = ({ images }) => {
	const image = images.hits[0];

	const handlowDownload = () => {
		axios
			.get(image.largeImageURL, {
				responseType: 'blob',
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `${image.tags}.jpg`);
				document.body.appendChild(link);
				link.click();
			});
	};

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
											<button className="btn btn-primary " onClick={handlowDownload}>
												<BsDownload className="mb-1" /> Download
											</button>
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
	const images = await searchImages('', { id: id });
	return {
		props: {
			images,
		},
	};
};

export default Photo;
