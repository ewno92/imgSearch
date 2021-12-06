import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Gallery = (props) => {
	const images = props.images.hits;
	console.log(images);
	return (
		<>
			{images &&
				images.map((image, index) => {
					return (
						<Link href={`/photos/${image.id}`} key={index}>
							<Image src={image.previewURL} alt="Gallery" width={200} height={200} />
						</Link>
					);
				})}
			hi
		</>
	);
};

export default Gallery;
