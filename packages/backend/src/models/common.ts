import { connect } from "mongoose"

export const setUpMongoDb = async (url: string) => {
  await connect(url)
}
