import Head from 'next/head';
import Image from 'next/image';
import SearchBar from '../components/SearchBar';
import { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';
import { authenticate } from 'pixabay-api';
//redux
import { actionCreator } from '../redux/actions/actionsCreator';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const { searchImages, searchVideos } = authenticate(PIXABAY_API_KEY);
const Index = ({ images }) => {
	// console.log(images);

	//redux
	const dispatch = useDispatch();
	const counter = useSelector((state) => state.counter);
	const { increment, decrement } = bindActionCreators(actionCreator, dispatch);
	console.log('counter: ', counter);

	return (
		<Layout>
			<button onClick={() => increment(5)}>+</button>
			<button onClick={() => decrement(5)}>-</button>
			<main>
				<Container className="w-100">
					<Row>
						<Col>
							<SearchBar />
						</Col>
					</Row>
				</Container>
				<Container>
					<Row data-Masonry={`{"percentPosition": true}`}>
						<Gallery images={images} />
					</Row>
				</Container>
			</main>
		</Layout>
	);
};

export const getServerSideProps = async () => {
	const images = await searchImages({ per_page: 20, safesearch: false });
	return {
		props: {
			images,
		},
	};
};

export default Index;
