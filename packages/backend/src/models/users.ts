import { model, Schema, Types } from "mongoose"
import { User } from "@webshop/shared"

const userSchema = new Schema({
  _id: String,
  name: { type: String, required: true },
  password: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  telefonNumber: Number,
  deliveryAddress: String,
})

export const UserModel = model<User>("User", userSchema)
export const getUser = async () => {
  return UserModel.find({}).exec()
}

export const createUser = async (user: User): Promise<User> => {
  const u = new UserModel(user)
  u._id = new Types.ObjectId().toString() // https://stackoverflow.com/questions/17899750/how-can-i-generate-an-objectid-with-mongoose
  u.save()
  return u
}
