const logger = require('pino')()
const querystring = require('querystring')
const rp = require('request-promise')
const Promise = require('bluebird')
const NodeCache = require('node-cache')
const cache = require('../cache')

// アクセストークンキャッシュ有効期限
// 60*60*24*29 = 2505600 = 29日間
const ttl = 2505600

module.exports = async (client_id, client_secret) => {
  // キャッシュを取得
  const cacheKey = `access_token:${client_id}`
  const accessToken = await cache.get(cacheKey)
  if (accessToken) {
    logger.info('アクセストークンをキャシュから取得', client_id)
    return accessToken
  }

  // アクセストークンを発行
  logger.info('アクセストークンを発行', client_id)
  const options = {
    method: 'POST',
    uri: 'https://api.line.me/v2/oauth/accessToken',
    body: querystring.stringify({
      grant_type: 'client_credentials',
      client_id,
      client_secret
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    resolveWithFullResponse: true,
    json: true
  }

  const res = await rp(options)
  if (res.statusCode != 200) {
    return Promise.reject(
      new Error('LINEチャンネルアクセストークンの取得に失敗')
    )
  }

  // キャッシュを設定
  await cache.set(cacheKey, res.body.access_token, ttl)

  return res.body.access_token
}
