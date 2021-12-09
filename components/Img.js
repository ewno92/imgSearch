import React from 'react';
import Image from 'next/image';

const Img = (props) => {
	console.log(props);
	const { tags, webformatURL, webformatHeight, webformatWidth } = props;
	return (
		<div className="row">
			<div className="col-md-12 px-0">
				<div className="rounded-lg overflow-hidden">
					<Image width={webformatWidth} height={webformatHeight} src={webformatURL} className="img-fluid " alt={tags}></Image>
				</div>
			</div>
		</div>
	);
};

export default Img;
