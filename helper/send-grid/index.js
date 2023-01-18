import sgMail from '../../utilities/send-grid/sgMail.js'

export const sendTextMail = async (to, from, subject, text, attachments) => {
  return await sgMail.send({
    to,
    from,
    subject,
    text,
    attachments
  })
}
