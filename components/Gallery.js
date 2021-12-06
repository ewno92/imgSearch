import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Col } from 'react-bootstrap';

const Gallery = (props) => {
	const images = props.images.hits;
	console.log(images);
	return (
		<>
			{images &&
				images.map((image, index) => {
					return (
						<Col md={3}>
							<Link href={`/photos/${image.id}`} key={index}>
								<Image src={image.webformatURL} width={image.webformatWidth} height={image.webformatHeight} alt={image.tags} />
							</Link>
						</Col>
					);
				})}
			hi
		</>
	);
};

export default Gallery;
