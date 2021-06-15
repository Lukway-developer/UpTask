const nodemailer = require('nodemailer')
const juice = require('juice')
const path = require('path')
const pug = require('pug')
const { convert } = require('html-to-text')
const emailConfig = require('../config/email')

exports.sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password
    }
  })

  const html = generateHTML(options.htmlFile, options)
  const text = convert(html)

  // send mail with defined transport object
  const info = await transporter.sendMail({

    from: 'UpTask ✅ <no-reply@uptask.com>',
    to: options.user.email,
    subject: options.subject,
    text,
    html
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

const generateHTML = (file, options) => {
  const html = pug.renderFile(`${path.join(__dirname)}/../views/emails/${file}.pug`, options)
  return juice(html)
}
