import axios from 'axios';

// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError)
        alert("Unexpected error");

    return Promise.reject(error);
})

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}