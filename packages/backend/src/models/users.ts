import { model, Schema, Types } from "mongoose"
import { User } from "@webshop/shared"
import bcrypt from "bcrypt"

const userSchema = new Schema({
  _id: { type: String },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, lowercase: true },
  phoneNumber: { type: Number },
  deliveryAddress: { type: String },
})

export const UserModel = model<User>("User", userSchema)

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
