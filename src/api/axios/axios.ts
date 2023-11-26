import axios from 'axios';
//
const BASE_URL = 'http://localhost:8080'; // URL of Backend, remember to add the api

export default axios.create({
    baseURL: BASE_URL
});

// This is to be used for any routes that requires authentication first
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});
