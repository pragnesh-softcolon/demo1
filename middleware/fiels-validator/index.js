import { validationResult } from 'express-validator'
import { sendBadRequest } from '../../utilities/response/index.js'
import messages from '../../utilities/messages.js'


export const validateField = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // Invalid Filed
    return sendBadRequest(res, errors.array()[0].msg, errors.array())
  }
  next()
}





export default validateField
