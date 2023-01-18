import config from '../../config/index.js'
import { AdminModel } from '../../models/admin/admin.js'
import logger from '../../utilities/logger.js'
import messages from '../../utilities/messages.js'
import { sendBadRequest, sendSuccess } from '../../utilities/response/index.js'

export const passcode = async (req, res) => {
  try {
    const code = 0
    if (req.body.code && req.body.code === config.NUMBER_ONE) {
      const message = 'App'
      return sendSuccess(res, messages.gotheApp, message)
    }
    if (req.body.code && req.body.code === config.NUMBER_TWO) {
      const message = 'Game'
      return sendSuccess(res, messages.gotheGame, message)
    }
    if (req.body.code && req.body.code === config.NUMBER_THREE) {
      const message = 'invalid'
      return sendSuccess(res, messages.invalid, message)
    }
    if (req.body.code && req.body.code === config.NUMBER_FOUR) {
      const message = 'delete'
      return sendSuccess(res, messages.deleteuser, message)
    }
    return sendSuccess(code)
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// delete user
export const deleteUserData = async (req, res) => {
  try {
    const _id = req.query
    const UserData = await AdminModel.findOneAndDelete({ _id })
    if (!UserData) {
      return sendBadRequest(res, messages.userNotFound)
    }
    return sendSuccess(res, messages.userdeletesuccessfully)
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}
