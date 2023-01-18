import mongoose from 'mongoose'
const Schema = mongoose.Schema

const adminSchema = new Schema(
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
    otp: {
      type: String
    },
    otp_exp_time: {
      type: Date,
      default: Date.now()
    },
    image: {
      type: String
    },
    // refresh_token_id: {
    //   type: String
    // },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export const AdminModel = mongoose.model('admin', adminSchema)
