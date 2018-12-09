require('dotenv').config()

const logger = require('pino')()
const crypto = require('crypto')
const cache = require('../repositories/cache')
const createLineClient = require('../repositories/line/createLineClient')

// LINEの署名検証
const validateSignature = req => {
  if (!req.body) {
    logger.info('LINEの署名検証でリクエストボディが空')
    return false
  }

  try {
    const signature = crypto
      .createHmac('SHA256', process.env.LINE_CHANNEL_SECRET)
      .update(req.body)
      .digest('base64')
    const headersSignature = req.headers['x-line-signature']
    if (headersSignature != signature) {
      logger.info('LINEの署名検証で署名不一致', { headersSignature, signature })
      return false
    }
  } catch (err) {
    logger.info('LINEの署名検証でエラー発生', { msg: err.message })
    return false
  }

  return true
}

module.exports = async (req, res, next) => {
  logger.info({ headers: req.headers, body: req.body })

  // LINEの署名検証
  if (!validateSignature(req)) {
    return res.status(403).json({})
  }

  // LINE Messaging APIのクライントを作成
  const client = await createLineClient()

  const events = JSON.parse(req.body).events
  events.forEach(async event => {
    let messages = [
      {
        type: 'text',
        text: `${event.message.text}を受信しました`
      }
    ]

    // リプライを送信
    // あえてawaitで待ち受けない
    client.replyMessage(event.replyToken, messages).catch(err => {
      logger.error('LINEのリプライに失敗', { msg: err.message })
    })
  })

  // リプライより前にHTTPステータス200を返却
  res.json()
}
