import { sendBadRequest, sendSuccess } from '../../utilities/response/index.js'
import { UserModel } from '../../models/user/user.js'
import messages from '../../utilities/messages.js'
import logger from '../../utilities/logger.js'
// import bcrypt from 'bcrypt'
// import { sendTextMail } from '../../helper/send-grid'
// import config from '../../config'

// add user
export const addUser = async (req, res) => {
  try {
    const data = req.body
    // find
    const user = await UserModel.findOne(
      { phone_number: data.phone_number },
      { phone_number: 1 }
    )

    if (user) {
      console.log(user)
      return sendBadRequest(res, messages.userAlreadyExists)
    }
    // console.log(req.files)
    const filedata = req.files.image[0]
    console.log(filedata)
    data.image = filedata.filename

    // create new user
    const newUser = new UserModel(data)
    await newUser.save()

    // response
    return sendSuccess(res, newUser, messages.userCreateSuccessfully)
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// get user
// get loading data
export const getUserData = async (req, res) => {
  try {
    const getAllData = await UserModel.find({ deleted: { $ne: true } })
    if (!getAllData) {
      return sendBadRequest(res, messages.userdataNotFound)
    }
    if (req.query.userId) {
      const _id = req.query.userId
      const getData = await UserModel.findOne({ _id, deleted: { $ne: true } })
      if (!getData) {
        return sendBadRequest(res, messages.userdataNotFound)
      }
      return sendSuccess(res, getData)
    }
    return sendSuccess(res, getAllData)
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// update user
export const updateUser = async (req, res) => {
  try {
    const _id = req.query.userId
    const data = req.body
    let updateData = await UserModel.findOne({ _id })
    if (!updateData) {
      console.log(updateData)
      return sendBadRequest(res, messages.userNotFound)
    }
    if (data.name) {
      updateData.name = data.name
    }
    if (data.phone_number) {
      updateData.phone_number = data.phone_number
    }
    if (data.isActive) {
      updateData.isActive = data.isActive
    }
    if (data.deleted) {
      updateData.deleted = data.deleted
    }
    // if (req.files.image) {
    //   const imageName = updateData.image
    //   // console.log(imageName)
    //   fs.unlink(`./public/file/${imageName}`, (err) => {
    //     if (err) console.log(err)
    //     else {
    //       console.log('deleted image successfully')
    //     }
    //   })
    //   const filedata = req.files.gps_image[0]
    //   // console.log(filedata)
    //   updateData.gps_image = filedata.filename
    // }

    updateData = await updateData.save()
    return sendSuccess(res, updateData, messages.success)
  } catch (e) {
    // console.log(e)
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// delete user
export const deleteUserData = async (req, res) => {
  try {
    const _id = req.query.userId
    const UserData = await UserModel.findOneAndUpdate({ _id }, { $set: { deleted: true } })
    if (!UserData) {
      return sendBadRequest(res, messages.userNotFound)
    }
    return sendSuccess(res, messages.userdeletesuccessfully)
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}
