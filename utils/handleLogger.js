const { IncomingWebhook } = require("@slack/webhook")
require('dotenv').config();

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

const loggerStream = {
    write: message => {
        webHook.send({
            text: message
        })
    }
}

module.exports = loggerStream
