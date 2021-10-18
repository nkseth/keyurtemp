import axios from 'axios';

// ----------------------------------------------------------------------
const baseurl = 'https://strapi-api-test.simpleaccounts.io';

// const axiosInstance = axios.create();
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
// );

const axiosInstance=axios.create({
    baseURL:baseurl,

})

export default axiosInstance;
