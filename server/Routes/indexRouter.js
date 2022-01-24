const { Router } = require('express')
const indexController = require('../Controllers/indexControler')

const router = Router()

router.route('')
    .get(indexController.getData)
    .post(indexController.addData)

module.exports = router

