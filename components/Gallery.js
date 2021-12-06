import React from 'react';
import Image from 'next/image';
const Gallery = (props) => {
	const images = props.images.hits;
	console.log(images);
	return (
		<>
			{images &&
				images.map((image, index) => {
					return <Image src={image.previewURL} alt="Gallery" width={200} height={200} />;
				})}
			hi
		</>
	);
};

export default Gallery;
