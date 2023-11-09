/* eslint-disable prettier/prettier */
import axios from 'axios';

let request = axios.create({
    baseURL: 'http://localhost:3000/message',
    timeout: 60000,
});

//请求拦截处理
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//返回拦截处理
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export const getMessage = function (param) {
    return request.get('/getMessage', { params: param }).then(res => {
        return Promise.resolve(res.data);
    }).catch(err => {
        return Promise.reject(err);
    });
};
export const addMessage = function (data) {
    return request.post('/addMessage', data).then(res => {
        return Promise.resolve(res.data);
    }).catch(err => {
        return Promise.reject(err);
    });
};
export const updateMessageLike = function (data) {
    return request.post('/updateMessageLike', data).then(res => {
        return Promise.resolve(res.data);
    }).catch(err => {
        return Promise.reject(err);
    });
};
