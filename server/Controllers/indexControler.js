const { DB } = require('../DB')

const getData = async (req, res) => {
    const result = JSON.stringify(DB)
    res.send(result)
}

const addData = async (req, res) => {
    const reqData = await req.body
    DB.push(reqData)
    res.send(DB)
}

module.exports = { getData, addData }
