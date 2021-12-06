import Navbar from './Navbar';
import React from 'react';

const Layout = ({ children }) => {
	return (
		<div className="d-flex">
			<section id="layout" className="w-100">
				<Navbar />
				{children}
			</section>
		</div>
	);
};

export default Layout;
