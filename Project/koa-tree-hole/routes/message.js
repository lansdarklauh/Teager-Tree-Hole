const router = require('koa-router')()
const messageOption = require('../model/MessagesList')
const nanoid = require('nanoid').nanoid
const jwt = require('jsonwebtoken')
const tokenConfig = {
    privateKey: 'Teager',
    passwordKey: 'LansDarkLauh'
}

router.prefix('/message')

router.get('/getMessage', async function (ctx, next) {
    const { id, audit } = ctx.query
    if (audit) {
        const token = ctx.get('Authorization')
        if (token === '') {
            ctx.body = {
                code: 200,
                data: false,
                msg: '请重新登录'
            }
        } else {
            try {
                let res = await messageOption.getMessages(null, false, id)
                ctx.body = {
                    code: 200,
                    data: res || null
                }
            } catch {
                ctx.body = {
                    code: 200,
                    data: false,
                    msg: '请重新登录'
                }
            }
        }
    } else {
        let res = await messageOption.getTimes()
        if (res && res.length) {
            const times = res.map(item => item.time)
            if (times && times.length) {
                const index = parseInt(Math.random() * (times.length) + 0, 10)
                const date = times[index]
                res = await messageOption.getMessages(date, false, id)
                if (res && res.state === 2) res.author = ''
            }
        }
        ctx.body = {
            code: 200,
            data: res || null
        }
    }
})

router.get('/getMessageList', async function (ctx, next) {
    const token = ctx.get('Authorization')
    if (token === '') {
        ctx.body = {
            code: 200,
            data: false,
            msg: '请重新登录'
        }
    } else {
        try {
            const userInfo = jwt.verify(token, tokenConfig.privateKey)
            const { time, audit } = ctx.query
            if (audit) {
                let res = await messageOption.getMessages(null, true)
                ctx.body = {
                    code: 200,
                    data: res
                }
            } else {
                if (time) {
                    let res = await messageOption.getMessages(time, true)
                    ctx.body = {
                        code: 200,
                        data: res
                    }
                } else {
                    let res = await messageOption.getTimes()
                    if (res && res.length) {
                        const times = res.map(item => item.time)
                        if (times && times.length) {
                            const date = times[times.length - 1]
                            res = await messageOption.getMessages(date, true)
                        }
                    }
                    ctx.body = {
                        code: 200,
                        data: res
                    }
                }
            }
        } catch {
            ctx.body = {
                code: 200,
                data: false,
                msg: '请重新登录'
            }
        }
    }
})

router.post('/updateMessage', async function (ctx, next) {
    const token = ctx.get('Authorization')
    if (token === '') {
        ctx.body = {
            code: 200,
            data: false,
            msg: '请重新登录'
        }
    } else {
        try {
            const userInfo = jwt.verify(token, tokenConfig.privateKey)
            const { state, tag, id, time } = ctx.request.body
            let res = await messageOption.getMessages(time, false, id)
            if (res) {
                let obj = res
                obj.state = state
                obj.tag = tag
                let flag = await messageOption.updateMessage(obj)
                if (flag.res) {
                    ctx.body = {
                        code: 200,
                        data: true
                    }
                } else {
                    ctx.body = {
                        code: 200,
                        data: false,
                        msg: '修改失败'
                    }
                }
            } else {
                ctx.body = {
                    code: 200,
                    data: null,
                    msg: '没有找到对应的语句'
                }
            }
        } catch {
            ctx.body = {
                code: 200,
                data: false,
                msg: '请重新登录'
            }
        }
    }
})

router.post('/updateMessageLike', async function (ctx, next) {
    try {
        const { like, id, time } = ctx.request.body
        let res = await messageOption.getMessages(time, false, id)
        if (res) {
            let obj = res
            obj.like = like
            let flag = await messageOption.updateMessage(obj)
            if (flag.res) {
                ctx.body = {
                    code: 200,
                    data: true
                }
            } else {
                ctx.body = {
                    code: 200,
                    data: false,
                    msg: '修改失败'
                }
            }
        } else {
            ctx.body = {
                code: 200,
                data: null,
                msg: '没有找到对应的语句'
            }
        }
    } catch {
        ctx.body = {
            code: 200,
            data: false,
            msg: '请重新登录'
        }
    }
})

router.post('/addMessage', async function (ctx, next) {
    const date = new Date()
    const { type, tag, author, content } = ctx.request.body
    if (type && tag && author && content) {
        let obj = {
            id: nanoid(),
            content: content,
            author: author,
            like: 0,
            state: 0,
            type: Number(type),
            tag: tag,
            time: date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
        }
        let res = await messageOption.addMessages('AuditList', obj)
        if (res.res) {
            ctx.body = {
                code: 200,
                data: true
            }
        } else {
            ctx.body = {
                code: 200,
                data: false,
                msg: '添加失败'
            }
        }
    } else {
        ctx.body = {
            code: 200,
            data: false,
            msg: '缺失所需语句信息'
        }
    }
})

router.post('/passMessage', async function (ctx, next) {
    const token = ctx.get('Authorization')
    if (token === '') {
        ctx.body = {
            code: 200,
            data: false,
            msg: '请重新登录'
        }
    } else {
        try {
            const userInfo = jwt.verify(token, tokenConfig.privateKey)
            const { state, tag, id } = ctx.request.body
            let message = await messageOption.getMessages(null, false, id)
            if (message) {
                message.state = Number(state)
                message.tag = tag
                delete message._id
                let addRes = await messageOption.addMessages('MessagesList', message)
                if (addRes.res) {
                    await messageOption.deleteMessages('AuditList', null, id)
                    ctx.body = {
                        code: 200,
                        data: true
                    }
                } else {
                    ctx.body = {
                        code: 200,
                        data: false,
                        msg: '过审失败'
                    }
                }
            } else {
                ctx.body = {
                    code: 200,
                    data: false,
                    msg: '查不到对应的语句'
                }
            }
        } catch {
            ctx.body = {
                code: 200,
                data: false,
                msg: '请重新登录'
            }
        }
    }
})

router.delete('/deleteMessage', async function (ctx, next) {
    const token = ctx.get('Authorization')
    if (token === '') {
        ctx.body = {
            code: 200,
            data: false,
            msg: '请重新登录'
        }
    } else {
        try {
            const userInfo = jwt.verify(token, tokenConfig.privateKey)
            const { id, time, state } = ctx.request.body
            let res = await messageOption.deleteMessages(state === 0 ? 'AuditList' : 'MessagesList', time, id)
            if (res.res) {
                ctx.body = {
                    code: 200,
                    data: true
                }
            } else {
                ctx.body = {
                    code: 200,
                    data: false,
                    msg: res.msg
                }
            }
        } catch {
            ctx.body = {
                code: 200,
                data: false,
                msg: '请重新登录'
            }
        }
    }
})

module.exports = router