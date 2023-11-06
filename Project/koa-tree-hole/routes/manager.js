const router = require('koa-router')()
const managerOption = require('../model/ManagersList')
const CryptoJS = require("crypto-js");
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const tokenConfig = {
    privateKey: 'Teager',
    passwordKey: 'LansDarkLauh'
}

router.prefix('/manager')

router.post('/login', async (ctx, next) => {
    const { name, password } = ctx.request.body
    const pwd = await managerOption.getManager(name)
    // const realPWD = CryptoJS.AES.decrypt(pwd.password, tokenConfig.passwordKey).toString(CryptoJS.enc.Utf8);
    if (password === md5(pwd.password)) {
        const userInfo = { name: name }
        const token = jwt.sign(userInfo, tokenConfig.privateKey, { expiresIn: '10h' })
        ctx.body = {
            code: 200,
            data: token,
            msg: '登录成功'
        }
    } else {
        ctx.body = {
            code: 200,
            data: false,
            msg: '登录失败'
        }
    }
})

module.exports = router
