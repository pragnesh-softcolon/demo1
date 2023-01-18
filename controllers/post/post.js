import { sendBadRequest, sendSuccess } from '../../utilities/response/index.js'
import { PostModel } from '../../models/post/post.js'
import messages from '../../utilities/messages.js'
import logger from '../../utilities/logger.js'
import { deleteMultipleFile } from '../../middleware/deleteFile.js'
import { GroupModel } from '../../models/group/group.js'
import mongoose from 'mongoose'


// create post
export const post = async (req, res) => {
  try {
    const data = req.query
    const response = []
    for (const filedata of req.files.image) {
      data.image_path = filedata.path
      response.push(await new PostModel(data).save())
      console.log(filedata);
    }
    return sendSuccess(res, response, messages.postCreateSuccessfully)
  } catch (e) {
    console.log(e);
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// save image
export const postimage = async (req, res) => {
  try {
    const _id = req.query.id
    const postimage = await PostModel.findOne({ _id })
    
    if (!postimage.name === req.body.name) {
      return sendBadRequest(res, messages.postNotFound)
    }

    if (!(((postimage.image).length + req.files.image.length) <= 40)) {
      await deleteMultipleFile(req.files.image)
      return sendBadRequest(res, messages.errorMessage)
    }
    for (const productPhoto of req.files.image) {
      const filePath = productPhoto.path
      for (let i=0; i<req.files.image.length; i++){
      }
     
    }
    return sendSuccess(res, messages.postimage)
  } catch (e) {
    console.log(e)
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// get post
export const getPost = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 0
    const offset = req.query.offset ? parseInt(req.query.offset) : 0
    const getAllData = await PostModel.find({ deleted: { $ne: true } }).limit(limit).skip(offset).sort({ createdAt: -1 })
    if (!getAllData) {
      return sendBadRequest(res, messages.postNotFound)
    }
    if(!mongoose.Types.ObjectId.isValid(req.query._id)){
      return sendBadRequest(res, messages.invalidpostid)
    }

    const options = {}
    console.log(req.query);
    console.log(req.query.ploat_number);
    if(req.query.ploat_number)   options.plot_number = { $regex: req.query.ploat_number, $options: 'i' }
    
    
    if (req.query._id) options.group_id = req.query._id

    const findnumber = await PostModel.find(options).limit(limit).skip(offset).sort({ createdAt: -1 })
  
    console.log(options);
    return sendSuccess(res, findnumber,messages.success)
    // return res.status(200).json(findnumber) 
  }  
    catch (e) {
    console.log(e);
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// update post
export const updatePost = async (req, res) => {
  try {
    const _id = req.query.id
    const data = req.query

    // find
    let updatepostdata = await PostModel.findById({ _id })
    // console.log(updatepostdata.user_name)
    if (!updatepostdata) {
      return sendBadRequest(res, messages.postNotFound)
    }
    if (data.user_name) {
      updatepostdata.user_name = data.user_name
    }
    if (data.plot_number) {
      updatepostdata.plot_number = data.plot_number
    }
    if (data.date) {
      updatepostdata.date = data.date
    }
    if (data.upload_date) {
      updatepostdata.upload_date = data.upload_date
    }
    if (data.check_number) {
      updatepostdata.check_number = data.check_number
    }
    if (data.amount) {
      updatepostdata.amount = data.amount
    }
    if (data.group_id) {
      updatepostdata.group_id = data.group_id
    }

    updatepostdata = await updatepostdata.save()
    return sendSuccess(res, updatepostdata, messages.success)
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}

// delete post

export const deletePost = async (req, res) => {
  try {
    const _id = req.query.id
    const deletepostdata = await PostModel.findOneAndDelete({ _id })
    if (!deletepostdata) {
      return sendBadRequest(res, messages.postNotFound)
    }
    return sendSuccess(res, messages.postdelete)
  } catch (e) {
    logger.log({ level: 'error', message: e })
    return sendBadRequest(res, messages.errorMessage)
  }
}
