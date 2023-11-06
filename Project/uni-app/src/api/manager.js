const url = 'http://localhost:3000/manager'

export const login = function (data) {
    return new Promise((resolve) => {
        uni.request({
            url: url + '/login', //仅为示例，并非真实接口地址。
            method: 'POST',
            data: data || {},
            success: (res) => {
                resolve(res)
            }
        });
    })
}