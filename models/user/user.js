import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone_number: {
      type: String,
      trim: true,
      required: true
    },
    image: {
      type: String
    },
    // isActive: {
    //   type: Boolean,
    //   default: true
    // },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export const UserModel = mongoose.model('user', userSchema)
