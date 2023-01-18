
import config from '../../config/index.js'
import { AdminModel } from '../../models/admin/admin.js'
import logger from '../../utilities/logger.js'
// import bcrypt from 'bcrypt'

// this is for first time admin server ups
export const AdminRegistor = async () => {
  const Admin = config.NAME
  const phonenumber = config.PHONE_NUMBER

  // find email is existing or not
  let existingAdmin = await AdminModel.findOne(
    { name: Admin },
    { name: 1, deleted: 1 }
  )
  // if existing
  if (
    existingAdmin &&
      !existingAdmin.deleted
  ) {
    return
  }

  // create new admin
  if (existingAdmin) {
    existingAdmin.deleted = false
  } else {
    existingAdmin = new AdminModel({
      name: Admin,
      phone_number: phonenumber
    })
  }
  // console.log(existingAdmin)

  // response in successful admin created
  await Promise.all([
    existingAdmin.save()
  ])

  logger.info('Admin Created')
}

// validateEmail
// const validateEmail = (email) => {
//   return String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     )
// }
