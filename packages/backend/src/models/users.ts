import { model, Schema } from "mongoose"
import User from "@webshop/shared"

// interface User {
//   _id?: string
//   name: string
//   password: string
//   mail: string
//   telefonNumber?: number
//   deliveryAddress?: string
// }

const userSchema = new Schema({
  _id: String,
  name: { type: String, required: true },
  password: { type: String, required: true },
  mail: String,
  telefonNumber: Number,
  deliveryAddress: String,
})

const UserModel = model<User>("User", userSchema)
export const getUser = async () => {
  return UserModel.find({}).exec()
}
