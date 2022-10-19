import { model, Schema, Types } from "mongoose"
import { User } from "@webshop/shared"
import bcrypt from "bcrypt"

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

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10)
  // now we set user password to hashed password
  u.password = await bcrypt.hash(u.password, salt)

  u.save()
  return u
}
