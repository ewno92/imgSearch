import axios from 'axios';
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const API = axios.create({
	baseURL: 'https://pixabay.com/api',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	params: {
		key: '24678649-c224b16b3b229b01496615e87',
		safesearch: true,
	},
});

export default API;
