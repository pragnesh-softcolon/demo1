import express from 'express'
import { check } from 'express-validator'
import multer from 'multer'
import { addUser, isAdmin, updateUser, deleteUserData, getUserData, userAuthentication } from '../../controllers/index.js'
import logger from '../../utilities/logger.js'
import { validateField } from '../../middleware/fiels-validator/index.js'
const router = express.Router()

// Config Storage Multer
const deckDownloadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/file/image')
  },
  filename: function (req, file, cb) {
    logger.log({ level: 'debug', message: req.body })
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: deckDownloadStorage
})

router.post('/add-user',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  [
    check('name').exists().withMessage('Name is required!'),
    check('phone_number').exists().withMessage('Phone number is required!')
  ],
  validateField,
  isAdmin,
  addUser
)

router.post('/user-auth',
  [
    check('name').exists().withMessage('Name is required!')
  ],
  validateField,
  userAuthentication
)

// get user
router.get('/get-user', isAdmin, getUserData)

// update user
router.put('/update-user', isAdmin, updateUser)

// delete user
router.delete('/delete-user', isAdmin, deleteUserData)

export default router
