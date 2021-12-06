import axios from 'axios';
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const API = axios.create({
	baseURL: 'https://pixabay.com/api',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	params: {
		key: PIXABAY_API_KEY,
		safesearch: true,
	},
});

export default API;
