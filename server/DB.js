const { v4: uuid } = require('uuid')

const DB = [{ id: uuid(), item: 'first TODO' }, { id: uuid(), item: 'second TODO' }]

module.exports = { DB }
