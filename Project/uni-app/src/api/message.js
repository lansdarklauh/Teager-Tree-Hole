import axios from './api/index.js'

export default {
    getMessage(param) {
        return axios({
            url: "/message/getMessage",
            method: 'get',
            params: param
        })
    },
    getMessageList(param) {
        return axios({
            url: '/message/getMessage',
            method: 'get',
            param: param
        })
    },
    updateMessage(data) {
        return axios({
            url: '/message/updateMessage',
            method: 'post',
            data: data
        })
    },
    updateMessageLike(data) {
        return axios({
            url: '/message/updateMessageLike',
            method: 'post',
            data: data
        })
    },
    addMessage(data) {
        return axios({
            url: '/message/addMessage',
            method: 'post',
            data: data
        })
    },
    passMessage(data) {
        return axios({
            url: '/message/passMessage',
            method: 'post',
            data: data
        })
    },
    deleteMessage(data) {
        return axios({
            url: '/message/deleteMessage',
            method: 'delete',
            data: data
        })
    }
}