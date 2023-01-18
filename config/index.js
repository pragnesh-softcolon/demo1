'use strict'

import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

export default {
  NETWORK: {
    ETH: {
      RPC_API: process.env.RPC_API
    }
  },

  DATABASE: {
    MONGO: {
      URI: process.env.MONGO_URI
    }
  },

  LOGGER: {
    LEVEL: process.env.LOG_LEVEL || 'debug'
  },

  API_KEY: process.env.API_KEY,
  SECRET_ADMIN: process.env.SECRET_ADMIN,
  TOKEN_EXP: process.env.TOKEN_EXP,
  REFRESH_TOKEN_EXP: process.env.REFRESH_TOKEN_EXP,
  SECRET_ADMIN_REF: process.env.SECRET_ADMIN_REF,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  NAME: process.env.NAME,
  SECRET_USER: process.env.SECRET_USER,
  PHONE_NUMBER: process.env.PHONE_NUMBER,
  MAIN_ADMIN_EMAIL: process.env.MAIN_ADMIN_EMAIL,
  ERROR_SEND_EMAIL: process.env.ERROR_SEND_EMAIL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  USER_COMPANY_EMAIL: process.env.USER_COMPANY_EMAIL,
  NUMBER_ONE: process.env.NUMBER_ONE,
  NUMBER_TWO: process.env.NUMBER_TWO,
  NUMBER_THREE: process.env.NUMBER_THREE,
  NUMBER_FOUR: process.env.NUMBER_FOUR,
  IMAGE_PATH: process.env.IMAGE_PATH,
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
  ROOT_IMAGE: process.env.ROOT_IMAGE

}
