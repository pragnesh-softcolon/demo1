import express from 'express'
import multer from 'multer'
import config from '../../config/index.js'
import { createGroup, isAdmin, getGroup, updateGroup, deleteGroup } from '../../controllers/index.js'
import logger from '../../utilities/logger.js'
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

// create group
router.post('/create-group', isAdmin, upload.fields([{ name: 'image', maxCount: 10 }]),
  createGroup
)

// get group
router.get('/get-group', isAdmin, getGroup)

// update group
router.put('/update-group', isAdmin,
  updateGroup
)

// delete group
router.delete('/delete-group', isAdmin, deleteGroup)

export default router
