import mongoose from 'mongoose'
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const postSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true
    },
    plot_number: {
      type: String,
      required: true
    },
    group_id: {
      type: ObjectId,
      ref: 'group',
      required: true
    },
    cheque_number: {
      type: String
    },
    amount: {
      type: String
    },
    upload_date: {
      type: Date,
      default: Date.now()
    },
    image_path: {
      type: String,
    },
    date: {
      type: Date
    },
    deleted: {
      type: Boolean,
      default: false
    },
 

  },
  { timestamps: true ,
  }
)

export const PostModel = mongoose.model('post', postSchema)
