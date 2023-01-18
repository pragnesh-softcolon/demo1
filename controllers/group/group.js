import { sendBadRequest, sendSuccess } from '../../utilities/response/index.js'
import { GroupModel } from '../../models/group/group.js'
// import { deleteMultipleFile } from '../../middleware/deleteFile'
import messages from '../../utilities/messages.js'
import logger from '../../utilities/logger.js'

// create group
export const createGroup = async (req, res) => {
  try {
    const data = req.body
    // find
    let group = await GroupModel.findOne(
      { name: data.name }, { name: 1 }
    )
    if (group) {
      return sendBadRequest(res, messages.groupAlreadyExist)
    }

    // if (!(((group.image).length + req.files.image.length) <= 9)) {
    //   await deleteMultipleFile(req.files.image)
    //   return sendBadRequest(res, messages.errorMessage)
    // }

    group = {}
    const filedata = req.files.image[0]
    group.image = filedata.filename
    group.name = data.name

    // create new post
    const newGroup = new GroupModel(group)
    await newGroup.save()

    // response
    return sendSuccess(res, newGroup, messages.groupCreateSuccessfully)
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// get group

export const getGroup = async (req, res) => {
  try {
    const getAllData = await GroupModel.find({ deleted: { $ne: true } })
    if (!getAllData) {
      return sendBadRequest(res, messages.groupNOtFound)
    }
    if (req.query.id) {
      const _id = req.query.id
      const group = await GroupModel.findOne({ _id })
      if (!group) {
        return sendBadRequest(res, messages.groupNOtFound)
      }
      return sendSuccess(res, group)
    }
    return sendSuccess(res, getAllData)
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// update group

export const updateGroup = async (req, res) => {
  try {
    const _id = req.query.id
    const data = req.query
    let updategroupdata = await GroupModel.findById({ _id })
    // console.log(data)
    if (!updategroupdata) {
      console.log(updategroupdata)
      return sendBadRequest(res, messages.groupNOtFound)
    }
    // console.log(data.name)
    if (data.name) {
      updategroupdata.name = data.name
    //   console.log(updategroupdata.name)
    }
    if (data.status) {
      updategroupdata.status = data.status
    }

    updategroupdata = await updategroupdata.save()
    return sendSuccess(res, updategroupdata, messages.success)
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// delete group
export const deleteGroup = async (req, res) => {
  try {
    const _id = req.query.id
    const deletegroupdata = await GroupModel.findOne({ _id })
    if (!deletegroupdata.image) {
      deletegroupdata.delete()
      return sendBadRequest(res, messages.groupdeleted)
    }
    return sendBadRequest(res, messages.groupnotdelete)
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}
