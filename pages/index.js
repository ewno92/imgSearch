import Head from 'next/head';
import Image from 'next/image';
import SearchBar from '../components/SearchBar';
import { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';

const Index = () => {
	return (
		<Layout>
			<main>
				<Container>
					<Row>
						<Col>
							<SearchBar />
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col>
							<Gallery />
						</Col>
					</Row>
				</Container>
			</main>
		</Layout>
	);
};

export default Index;
