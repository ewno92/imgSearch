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
	const [search, setSearch] = useState('');
	const [select, setSelect] = useState('images');
	const [imgs, setImgs] = useState(images);

	// console.log(images);

	//redux
	const dispatch = useDispatch();
	const counter = useSelector((state) => state.counter);
	const { increment, decrement } = bindActionCreators(actionCreator, dispatch);
	console.log('counter: ', counter);

	const handleKeyword = (e) => {
		setSearch(e.target.value);
	};

	// const handleSubmit = (e) => {
	//   e.preventDefault();
	//   if (select === "images") {
	//     searchImages(search, { per_page: 20 }).then((data) => {
	//       setImgs(data);
	//     });
	//   } else {
	//     searchVideos(search, { per_page: 20 }).then((data) => {
	//       setImgs(data);
	//     });
	//   }
	// };
	const test = async (e) => {
		console.log('test');
		let data = await searchImages('people');
		setImgs(data);
	};
	return (
		<Layout>
			<button onClick={() => increment(5)}>+</button>
			<button onClick={() => decrement(5)}>-</button>
			<main>
				<Container className="w-100">
					<button onClick={test}>TEST</button>
					<Row>
						<Col>
							{/* <SearchBar
                search={search}
                handleKeyword={handleKeyword}
                handleSubmit={handleSubmit}
              /> */}
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

export const getServerSideProps = async () => {
	const images = await searchImages({ per_page: 20, safesearch: false });
	return {
		props: {
			images,
		},
	};
};

export default Index;
