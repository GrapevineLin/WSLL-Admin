import axios from 'axios';
import router from './router';

// axios 配置
axios.defaults.timeout = 8000;
// axios.defaults.baseURL = 'http://localhost:8887';
axios.defaults.baseURL = 'http://lghlh.top/WSLL';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.token) { //判断token是否存在
            config.headers.Authorization = localStorage.token; //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === 401) {
            router.replace('/');
            console.log("token过期或不存在");
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);
export default axios;