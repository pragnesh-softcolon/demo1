import express from 'express'
import multer from 'multer'
import logger from '../../utilities/logger.js'

import { check } from 'express-validator'
import { isAdmin, adminAuthentication, genrateRefreshToken, resetPassword, verify } from '../../controllers/index.js'
import { validateField } from '../../middleware/fiels-validator/index.js'
import { Adminimage } from '../../controllers/admin/auth.js'
import config from '../../config/index.js'
const router = express.Router()

const deckDownloadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.IMAGE_PATH)
  },
  filename: function (req, file, cb) {
    logger.log({ level: 'debug', message: req.body })
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: deckDownloadStorage
})

router.post('/Adminimage', upload.fields([{ name: 'image', maxCount: 1 }]),
  isAdmin, Adminimage
)

// verify otp
router.post('/verify-admin', verify)

// get admin
// router.get('/getadmin', getAdmin)

/* admin route */
router.post('/auth',
  [
    check('name').exists().withMessage('Name is required!'),
    check('phone_number').exists().withMessage('Phone Number is required!')
  ],
  validateField,
  adminAuthentication
)

// router.post('/add-user',
//   upload.fields([{ name: 'image', maxCount: 1 }]),
//   [
//     check('name').exists().withMessage('Name is required!'),
//     check('phone_number').exists().withMessage('Phone number is required!')
//   ],
//   validateField,
//   isAdmin,
//   addUser
// )

// genrate access token admin
router.post(
  '/genrate-access-token',
  // [
  //   check('token').exists().withMessage('Refresh Token is required!')
  // ],
  validateField,
  genrateRefreshToken
)

// change password
router.post(
  '/reset-password',
  [
    check('new_password').exists().withMessage('New Password is required!'),
    check('old_password').exists().withMessage('Old Password is required!')
  ],
  validateField,
  isAdmin,
  resetPassword
)

export default router
