import axios from './api/index.js'

export default {
    getMessage(data) {
        return axios({
            url: "/manager/login",
            method: 'post',
            data: data
        })
    }
}