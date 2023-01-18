import mongoose from 'mongoose'
const Schema = mongoose.Schema

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    status: {
      type: Boolean,
      default: false
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export const GroupModel = mongoose.model('group', groupSchema)
