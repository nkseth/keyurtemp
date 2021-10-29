import axios from 'axios';
import conf from './config';
// ----------------------------------------------------------------------
const baseurl = conf.REACT_APP_ENDPOINT;

// const axiosInstance = axios.create();
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
// );

const axiosInstance=axios.create({
    baseURL:baseurl,

})

export default axiosInstance;
