const url = 'http://localhost:3000/message'
import { useManagerStore } from '@/store/index'
const managerStore = useManagerStore()

export const getMessage = function (param) {
    return new Promise((resolve) => {
        uni.request({
            url: url + '/getMessage', //仅为示例，并非真实接口地址。
            method: 'GET',
            data: param || {},
            header: {
                'Authorization': managerStore.getToken()
            },
            success: (res) => {
                resolve(res)
            }
        });
    })
}
export const getMessageList = function (data) {
    return new Promise((resolve) => {
        uni.request({
            url: url + '/getMessageList', //仅为示例，并非真实接口地址。
            method: 'GET',
            header: {
                'Authorization': managerStore.getToken()
            },
            data: data || {},
            success: (res) => {
                resolve(res)
            }
        });
    })
}
export const updateMessage = function (data) {
    return new Promise((resolve) => {
        uni.request({
            url: url + '/updateMessage', //仅为示例，并非真实接口地址。
            method: 'POST',
            header: {
                'Authorization': managerStore.getToken()
            },
            data: data || {},
            success: (res) => {
                resolve(res)
            }
        });
    })
}
export const updateMessageLike = function (data) {
    return new Promise((resolve) => {
        uni.request({
            url: url + '/updateMessageLike', //仅为示例，并非真实接口地址。
            method: 'POST',
            header: {
                'Authorization': managerStore.getToken()
            },
            data: data || {},
            success: (res) => {
                resolve(res)
            }
        });
    })
}
export const addMessage = function (data) {
    return new Promise((resolve) => {
        uni.request({
            url: url + '/addMessage', //仅为示例，并非真实接口地址。
            method: 'POST',
            header: {
                'Authorization': managerStore.getToken()
            },
            data: data || {},
            success: (res) => {
                resolve(res)
            }
        });
    })
}
export const passMessage = function (data) {
    return new Promise((resolve) => {
        uni.request({
            url: url + '/passMessage', //仅为示例，并非真实接口地址。
            method: 'POST',
            header: {
                'Authorization': managerStore.getToken()
            },
            data: data || {},
            success: (res) => {
                resolve(res)
            }
        });
    })
}
export const deleteMessage = function (data) {
    return new Promise((resolve) => {
        uni.request({
            url: url + '/deleteMessage', //仅为示例，并非真实接口地址。
            method: 'DELETE',
            header: {
                'Authorization': managerStore.getToken()
            },
            data: data || {},
            success: (res) => {
                resolve(res)
            }
        });
    })
}