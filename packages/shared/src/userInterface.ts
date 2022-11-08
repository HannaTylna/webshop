export default interface User {
  _id?: string
  username: string
  password: string
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: number
  deliveryAddress?: string,
  role: 'admin' | 'user' | undefined;
}
