const express = require('express')
const app = express()
const router = express.Router()

// まずはルーティングのみ追加
router.post('/webhook', require('./routes/webhook'))

module.exports = router
