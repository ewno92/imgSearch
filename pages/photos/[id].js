import React from 'react';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import { authenticate } from 'pixabay-api';
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const { searchImages } = authenticate(PIXABAY_API_KEY);

const Photo = ({ images }) => {
	const image = images.hits[0];
	console.log(image);
	return (
		<Layout>
			<main>
				<Container>
					<Row>
						<Col md={8}>
							<Image src={image.previewURL} width={200} height={200} alt={image.tags} />
						</Col>
						<Col md={4}></Col>
					</Row>
				</Container>
			</main>
		</Layout>
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
