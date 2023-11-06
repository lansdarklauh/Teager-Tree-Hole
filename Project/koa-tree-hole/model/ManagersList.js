let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/"
const client = new MongoClient(url)

async function getManager(name) {
    let result = null
    await client.connect();
    let dbo = client.db("Teager-Tree-Hole");
    const res = await dbo.collection("ManagersList").find({ name: name }).toArray();
    result = res[0] || ''
    await await client.close();
    return Promise.resolve(result)
}

module.exports = {
    getManager: getManager
}
