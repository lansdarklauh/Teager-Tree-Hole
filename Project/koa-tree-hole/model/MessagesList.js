let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/"
const client = new MongoClient(url)

async function getMessages(time, all, id) {
    let result = null
    await client.connect();
    let dbo = client.db("Teager-Tree-Hole");
    if (time) {
        let arg = { "time": time }
        let res = await dbo.collection("MessagesList").find(arg).toArray();
        if (res.length) {
            if (all) result = res[0].chatList
            else {
                if (id) {
                    for (let i = 0; i < res[0].chatList.length; i++) {
                        if (res[0].chatList[i].id === id) {
                            result = res[0].chatList[i]
                        }
                    }
                } else {
                    const random = parseInt(Math.random() * (res[0].chatList.length) + 0, 10)
                    result = res[0].chatList[random]
                }
            }
        }
        await client.close();
        return Promise.resolve(result)
    } else {
        let res = await dbo.collection("AuditList").find({}).toArray();
        if (res.length) {
            if (all) result = res
            else {
                if (id) {
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].id === id) {
                            result = res[i]
                        }
                    }
                } else {
                    const random = parseInt(Math.random() * (res.length) + 0, 10)
                    result = res[random]
                }
            }
        }
        await client.close();
        return Promise.resolve(result)
    }
}

async function deleteMessages(list, time, id) {
    if (!list) {
        return Promise.reject({
            res: false,
            msg: '没传入集合'
        })
    }
    await client.connect();
    let dbo = client.db('Teager-Tree-Hole');
    let collection = dbo.collection(list)
    if (collection) {
        if (time) {
            if (list !== 'AuditList') {
                let arg = { "time": time }
                let res = await dbo.collection(list).find(arg).toArray()[0];
                if (res && res.length) {
                    const updateStr = { $set: { "chatList": res.chatList.filter(item => item.id !== id) } }
                    let delRes = await dbo.collection(list).updateOne(arg, updateStr);
                    console.log("删除成功");
                    await client.close();
                    return Promise.resolve({
                        res: true,
                        msg: '删除成功'
                    })
                } else {
                    await client.close()
                    return Promise.reject({
                        res: false,
                        msg: '没有找到对应时间'
                    })
                }
            } else {
                let arg = { "id": id }
                let delRes = await dbo.collection(list).deleteOne(arg);
                await client.close();
                return Promise.resolve({
                    res: true,
                    msg: '未过审语句删除成功'
                })
            }
        } else {
            await client.close()
            return Promise.reject({
                res: false,
                msg: '没有传入时间'
            })
        }
    } else {
        await client.close()
        return Promise.reject({
            res: false,
            msg: '没找到对应集合'
        })
    }

}

async function addMessages(list, message) {
    if (!list) {
        return Promise.reject({
            res: false,
            msg: '没传入集合'
        })
    }
    await client.connect();
    let dbo = client.db('Teager-Tree-Hole');
    let time = message.time
    if (time) {
        let arg = { "time": time }
        let collection = dbo.collection(list)
        if (collection) {
            if (list === 'MessagesList') {
                let res = await dbo.collection(list).find(arg).toArray()[0];
                if (res && res.length) {
                    const chatList = res.chatList.concat([message])
                    const updateStr = { $set: { "chatList": chatList } }
                    let addRes = await dbo.collection(list).updateOne(arg, updateStr);
                    await client.close();
                    return Promise.resolve({
                        res: true,
                        msg: '添加成功'
                    })
                } else {
                    let myobj = { "time": time, chatList: [message] };
                    let addRes = await dbo.collection(list).insertOne(myobj);
                    await client.close();
                    return Promise.resolve({
                        res: true,
                        msg: '新建时间后添加语句'
                    })
                }
            } else {
                let addRes = await dbo.collection(list).insertOne(message);
                await client.close();
                return Promise.resolve({
                    res: true,
                    msg: '未过审语句添加成功'
                })
            }
        } else {
            await client.close()
            return Promise.reject({
                res: false,
                msg: '没找到对应集合'
            })
        }
    } else {
        await client.close()
        return Promise.reject({
            res: false,
            msg: '语句没有时间'
        })
    }
}

async function updateMessage(message) {
    await client.connect();
    let dbo = client.db('Teager-Tree-Hole');
    let time = message.time
    let collection = db.collection(list)
    if (collection) {
        if (time) {
            let arg = { "time": time }
            let res = await dbo.collection('MessagesList').find(arg).toArray()[0];
            if (err) throw err;
            if (res && res.length) {
                let tempList = []
                for (let i = 0; i < res.chatList.length; i++) {
                    if (res.chatList[i].id === message.id) {
                        tempList.push(message)
                    } else {
                        tempList.push(res.chatList[i])
                    }
                }
                const updateStr = { $set: { "chatList": tempList } }
                let updateRes = await dbo.collection('MessagesList').updateOne(arg, updateStr);
                console.log("修改成功");
                await client.close();
                return Promise.resolve({
                    res: true,
                    msg: '修改成功'
                })
            } else {
                await client.close()
                return Promise.reject({
                    res: false,
                    msg: '没有找到对应时间'
                })
            }
        } else {
            await client.close()
            return Promise.reject({
                res: false,
                msg: '没有传入时间'
            })
        }
    } else {
        await client.close()
        return Promise.reject({
            res: false,
            msg: '没找到对应集合'
        })
    }
}

async function getTimes() {
    let result = null
    await client.connect();
    let dbo = client.db("Teager-Tree-Hole");
    const res = await dbo.collection("MessagesList").find({}, { time: 1, chatList: 0 }).toArray();
    result = res
    await await client.close();
    return result
}

module.exports = {
    getMessages: getMessages,
    updateMessage: updateMessage,
    deleteMessages: deleteMessages,
    addMessages: addMessages,
    getTimes: getTimes
}
