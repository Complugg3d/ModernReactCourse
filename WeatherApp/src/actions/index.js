import axios from 'axios';

const API_KEY = 'a11c63d159efc7e6d77f0d6fdd462e1e';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;


export const FETCH_WEATHER = 'FETCH_WEATHER';	

export function fetchWeather(city) {
	// body...
	const url = `${ROOT_URL}&q=${city},us`;
	const request = axios.get(url);


	return {
		type: FETCH_WEATHER,
		payload: request
	};
}