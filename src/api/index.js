import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

api.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default api;
