import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Nav = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">저작권 무료 이미지</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Nav;
