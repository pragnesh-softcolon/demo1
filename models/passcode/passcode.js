import mongoose from 'mongoose'

const Schema = mongoose.Schema()

const passcodeSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }

)

export const PasscodeModel = mongoose.model('passcode', passcodeSchema)
