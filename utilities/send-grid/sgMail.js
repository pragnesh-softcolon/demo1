import sgMail from '@sendgrid/mail'
import config from '../../config/index.js'

sgMail.setApiKey(config.SENDGRID_API_KEY)

export default sgMail
