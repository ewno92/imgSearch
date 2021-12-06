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
						<Col key={index} md={3}>
							<Link href={`/photos/${image.id}`}>
								<a>
									<Image src={image.webformatURL} width={image.webformatWidth} height={image.webformatHeight} alt={image.tags} />
								</a>
							</Link>
						</Col>
					);
				})}
			hi
		</>
	);
};

export default Gallery;
