const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

// Webhookエンドポイント
router.post(
  '/webhook',
  // 署名検証のためテキストでパース
  bodyParser.text({ type: 'application/json' }),
  require('./routes/webhook')
)

module.exports = router
