import { sendBadRequest, sendSuccess } from '../../utilities/response/index.js'
import { AdminModel } from '../../models/admin/admin.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import messages from '../../utilities/messages.js'
import logger from '../../utilities/logger.js'
// import { v4 as uuidv4 } from 'uuid'
import config from '../../config/index.js'
import md5 from 'md5'
import { UserModel } from '../../models/user/user.js'

/* isadmin or not */
export const isAdmin = async (req, res, next) => {
  try {
    // find token in headers
    const bearerToken = req.headers.authorization
    // if token find then verify
    if (bearerToken) {
      // console.log(bearerToken)
      const tokenInfo = await jwt.verify(
        String(bearerToken).split(' ')[1],
        config.NAME
      )

      // next step token and token id find
      if (tokenInfo && tokenInfo._id) {
        const adminDetails = await AdminModel.findOne(
          { _id: tokenInfo._id }
        )

        // Admin Does not exist
        if (!adminDetails) {
          return sendBadRequest(res, messages.adminNotFound)
        }

        // Attach Admin Info
        req.profile = adminDetails
        // next for using this method only

        next()
      } else {
        // when token is invalid
        logger.error(messages.tokenFormatInvalid)
        return sendBadRequest(res, messages.tokenFormatInvalid)
      }
    } else {
      // when some token related issue
      logger.warn(messages.authTokenRequired)

      return sendBadRequest(res, messages.authTokenRequired)
    }
  } catch (e) {
    logger.log({
      level: 'error',
      message: 'Error present in isAdmin middleware.\n' + e
    })
    // when token is expired or invalid
    if (String(e).includes('jwt expired')) {
      return sendBadRequest(res, messages.tokenExpiredError)
    } else if (String(e).includes('invalid token')) {
      return sendBadRequest(res, messages.invalidToken)
    }
    // response
    return sendBadRequest(res, messages.errorMessage)
  }
}

// is user
export const isUser = async (req, res, next, type = 1) => {
  try {
    // find token in headers
    const bearerToken = req.headers.authorization

    // if token find then verify
    if (bearerToken) {
      const tokenInfo = await jwt.verify(
        String(bearerToken).split(' ')[1],
        config.SECRET_USER
      )

      // next step token and token id find
      if (tokenInfo && tokenInfo._id) {
        const userDetails = await UserModel.findOne(
          { _id: tokenInfo._id }
        )

        // user Does not exist
        if (!userDetails) {
          return sendBadRequest(res, messages.userNotFound)
        }
        // Attach user Info
        req.user = userDetails
        console.log(req.user)
        // next for using this method only
        next()
      } else {
        // when token is invalid
        logger.error(messages.tokenFormatInvalid)
        return sendBadRequest(res, messages.tokenFormatInvalid)
      }
    } else {
      // when some token related issue
      logger.warn(messages.authTokenRequired)
      return sendBadRequest(res, messages.authTokenRequired)
    }
  } catch (e) {
    if (type === 0) {
      return await isAdmin(req, res, next, type)
    }
    // console.log(e)
    logger.log({
      level: 'error',
      message: 'Error present in isUser middleware.\n' + e
    })
    // when token is expired or invalid
    if (String(e).includes('jwt expired')) {
      return sendBadRequest(res, messages.tokenExpiredError)
    } else if (String(e).includes('invalid token')) {
      return sendBadRequest(res, messages.invalidToken)
    } else if (String(e).includes('jwt malformed')) {
      return sendBadRequest(res, messages.invalidToken)
    }
    // response
    return sendBadRequest(res, messages.errorMessage)
  }
}

// passcode verify
// export const passcode = async (req, res) => {
//   try {
//     const data = req.body
//     const passverify = await AdminModel.findOne({ name: data.name })
//     if (!passverify) {
//       return sendBadRequest(res, messages.error)
//     }
//   } catch (e) {
//     logger.log({ level: 'error', message: e })
//     return sendBadRequest(res, messages.errorMessage)
//   }
// }

// export const getAdmin = async (req, res) => {
//   try {
//     // console.log('sahil')

//     const random = Math.floor(Math.random() * 900000 + 100000)

//     console.log(random)
//     const admin = await AdminModel.findOne({ name: req.body.name })
//     // console.log(admin)
//     if (!admin) {
//       return sendBadRequest(res, messages.errorMessage)
//     }
//     const otpHash = md5(random)

//     console.log(otpHash)

//     const currentDate = new Date(Date.now())
//     console.log({ currentDate })
//     const otpExpireTime = new Date(currentDate.getTime() + 15 * 60 * 1000)
//     console.log(otpExpireTime)

//     admin.otp = otpHash
//     admin.otp_exp_time = otpExpireTime
//     console.log(admin)
//     await admin.save()
//     return sendSuccess(res, messages.successMessage)
//   } catch (e) {
//     logger.log({ level: 'error', message: e })
//     return sendBadRequest(res, messages.errorMessage)
//   }
// }

// otp verify
export const verify = async (req, res) => {
  try {
    const user = await AdminModel.findOne({ name: req.body.name })

    // console.log(admin)
    if (!user) {
      return sendBadRequest(res, messages.errorMessage)
    }
    const token = jwt.sign(
      {
        _id: user._id
      },
      config.SECRET_USER
    )

    await user.save()

    if (new Date() > user.otp_exp_time) {
      return res.json({
        message: 'otp is expired'
      })
    }
    // console.log(md5(req.body.otp))
    if (!(md5(req.body.otp) === user.otp)) {
      return res.json({
        message: 'otp not match'
      })
    }

    return sendSuccess(res, messages.success.loginSuccessfully, {
      access_token: token
    })
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// save image
export const Adminimage = async (req, res) => {
  try {
    const aimage = await AdminModel.findOne({ name: req.body.name })

    if (!aimage.name === req.body.name) {
      return sendBadRequest(res, messages.adminNotFound)
    }

    const filedata = req.files.image[0]
    aimage.image = filedata.filename
    await aimage.save()

    return sendSuccess(res, messages.adminimage)
  } catch (error) {
    return res.status(400).json({
      error: 'Something went wrong'
    })
  }
}

// ADMIN AUTHENTICATION CONTROLLER
export const adminAuthentication = async (req, res) => {
  try {
    const random = Math.floor(Math.random() * 900000 + 100000)
    console.log(random)
    // find admin detail by email
    const data = req.body
    const adminDetails = await AdminModel.findOne({ name: data.name, phone_number: data.phone_number })

    //   admin does not exist
    if (!adminDetails.name === req.body.name) {
      return sendBadRequest(res, messages.adminNamenotmatch)
    }

    if (!adminDetails.phone_number === req.body.phone_number) {
      return sendBadRequest(res, messages.adminPhonenotmatch)
    }

    const otpHash = md5(random)

    // console.log(otpHash)

    const currentDate = new Date(Date.now())
    // console.log({ currentDate })
    const otpExpireTime = new Date(currentDate.getTime() + 15 * 60 * 1000)
    // console.log(otpExpireTime)

    adminDetails.otp = otpHash
    adminDetails.otp_exp_time = otpExpireTime
    // console.log(adminDetails)

    const token = jwt.sign(
      {
        _id: adminDetails._id
      },
      config.NAME,
      { expiresIn: config.TOKEN_EXP * 60 }
    )

    await adminDetails.save()
    return sendSuccess(res,
      messages.loginSuccessfully, {
        access_token: token

      }
    )
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// USER AUTHENTICATION CONTROLLER
export const userAuthentication = async (req, res) => {
  try {
    // find user detail by email
    const data = req.body
    const userDetails = await UserModel.findOne({ name: data.name })

    //   user does not exist
    if (!userDetails.name === req.body.name) {
      return sendBadRequest(res, messages.userNamenotmatch)
    }

    const token = jwt.sign(
      {
        _id: userDetails._id
      },
      config.SECRET_USER
    )

    await userDetails.save()
    return sendSuccess(res,
      messages.loginSuccessfully, {
        access_token: token

      }
    )
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}
/* genrate access token */

export const genrateRefreshToken = async (req, res) => {
  try {
    const existingAdminDetails = await AdminModel.findOne({ name: req.body.name })
    // if admin is not existing
    if (!existingAdminDetails) {
      return sendBadRequest(res, messages.adminNotFound)
    }
    const token = jwt.sign(
      {
        _id: existingAdminDetails._id
      },
      config.NAME,
      { expiresIn: config.TOKEN_EXP * 60 }
    )
    return sendSuccess(res, {
      access_token: token
      // expire_in: config.REFRESH_TOKEN_EXP * 60
    },
    messages.tokenGenerateSuccessfully
    )
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

/* reset password for admin */

export const resetPassword = async (req, res) => {
  try {
    const data = req.body
    // find by token
    const adminDetails = await AdminModel.findOne({ _id: req.profile._id })
    // admin not exist
    if (!adminDetails) {
      return sendBadRequest(res, messages.adminNotFound)
    }
    // check password
    const comparePassword = bcrypt.compareSync(
      data.old_password,
      adminDetails.password
    )
    // password not match
    if (comparePassword === false) {
      return sendBadRequest(res, messages.passwordNotMatch)
    }
    // new password encrypt
    const newEncryptPassword = bcrypt.hashSync(data.new_password, 10)

    // nwe password save
    adminDetails.password = newEncryptPassword
    await adminDetails.save()

    // send response success
    return sendSuccess(res, messages.passwordResetSuccess)
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}
