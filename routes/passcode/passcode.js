import express from 'express'
import { passcode } from '../../controllers/index.js'
const router = express.Router()

router.post('/passcode', passcode)

export default router
