const line = require('@line/bot-sdk')
const getChannelAccessToken = require('./getChannelAccessToken')

module.exports = async () => {
  const channelAccessToken = await getChannelAccessToken(
    process.env.LINE_CHANNEL_ID,
    process.env.LINE_CHANNEL_SECRET
  )

  return new line.Client({ channelAccessToken })
}
