import axios from 'axios';

const request = axios.create({
    baseURL: "/api/",
    // baseURL: "http://104.248.174.217:3900/",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default request