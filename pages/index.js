import React, { useEffect, useState } from 'react';
import API from './api/pixabay';
import Img from '../components/Img';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroller';

let pageNum = 1;

const App = () => {
	const [imagesArray, setImagesArray] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	console.log(imagesArray);
	const fetchImages = (pageNumber) => {
		API.get('/', { params: { page: pageNumber } })
			.then((res) => {
				console.log(res.data);
				setImagesArray([...imagesArray, ...res.data.hits]);
				setTotalPages(res.data.totalHits / res.data.hits.length);
			})
			.catch((err) => console.log(err));
	};

	// function to fetch images based on the
	useEffect(() => {
		fetchImages(pageNum);
	}, []);

	const breakpointColumnsObj = {
		default: 6,
		1200: 3,
		992: 3,
		768: 2,
		576: 1,
	};

	return (
		<div className="App">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12">
						<InfiniteScroll pageStart={0} loadMore={() => fetchImages(++pageNum)} hasMore={pageNum < totalPages ? true : false}>
							<Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid" columnClassName="masonry-grid_column">
								{imagesArray.map((image) => (
									<Img key={image.id} {...image} />
								))}
							</Masonry>
						</InfiniteScroll>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
