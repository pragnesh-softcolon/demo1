import express from 'express'
import multer from 'multer'
import { isAdmin, post, getPost, updatePost, deletePost, postimage } from '../../controllers/index.js'
import logger from '../../utilities/logger.js'
import config from '../../config/index.js'
const router = express.Router()

const deckDownloadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.get('host').includes('localhost') || req.get('host').includes('127.0.0.1') ? config.IMAGE_PATH : config.ROOT_IMAGE)
  },
  filename: function (req, file, cb) {
    logger.log({ level: 'debug', message: req.body })
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: deckDownloadStorage
})

// post route
router.post('/create-post', isAdmin,upload.fields([{ name: 'image', maxCount: 10 }]), post)

router.post('/post-image', isAdmin, upload.fields([{ name: 'image', maxCount: 5 }]),
  postimage
)

// get post
router.get('/get-post', isAdmin, getPost)

// update post
router.put('/update-post', isAdmin, updatePost)

// delete post
router.delete('/delete-post', isAdmin, deletePost)

export default router
