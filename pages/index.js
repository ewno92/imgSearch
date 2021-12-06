import Head from 'next/head';
import Image from 'next/image';
import SearchBar from '../components/SearchBar';
import { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';
import { authenticate } from 'pixabay-api';
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const { searchImages, searchVideos } = authenticate(PIXABAY_API_KEY);
const Index = ({ images }) => {
	console.log(images);
	return (
		<Layout>
			<main>
				<Container style={{ backgroundColor: 'red' }} className="w-100">
					<Row>
						<Col>
							<SearchBar />
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col>
							<Gallery images={images} />
						</Col>
					</Row>
				</Container>
			</main>
		</Layout>
	);
};

export const getServerSideProps = async () => {
	const images = await searchImages('birthday cake', { per_page: 20 });
	return {
		props: {
			images,
		},
	};
};

export default Index;
