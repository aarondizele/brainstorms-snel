import axios from 'axios';

const request = axios.create({
    // baseURL: "/api/",
    baseURL: import.meta.env.DEV ? "http://104.248.174.217:3100/" : "/api/",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default request