import axios from 'axios';

const request = axios.create({
    // baseURL: "/api/",
    baseURL: import.meta.env.DEV ? "https://akibapay.brainstormtechs.com/api/gateway/" : "/api/",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default request