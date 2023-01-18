import express from 'express'
import healthRoute from './health/index.js'
import adminRoute from './admin/auth.js'
import userRoute from './user/user.js'
import passcodeRoute from './passcode/passcode.js'
import postRoute from './post/post.js'
import groupRoute from './group/group.js'

const router = express.Router()

/* GET home page. */

// like router use like this
router.use('/health', healthRoute)
router.use('/admin', adminRoute)
router.use('/user', userRoute)
router.use('/code', passcodeRoute)
router.use('/post', postRoute)
router.use('/group', groupRoute)

// app.use('/static', express.static(path.join(__dirname, 'your-folder-path'))) or
router.use(express.static('public'))

export default router
