import mongoose from 'mongoose'

// Schema
const UserSchema = new mongoose.Schema({
 email: { type: String, required: true },
 authentication: {
  password: { type: String, required: true, select: false },
  salt: { type: String, required: true, select: false },
  token: { type: String, select: false },
 },
})

// Model
export const UserModel = mongoose.model('User', UserSchema)

// Functions
export const getUsers = () => UserModel.find()

export const getUserById = (id: string) => UserModel.findById(id)

export const getUserByEmail = (email: string) => UserModel.findOne({ email })

export const getUserByToken = (token: string) => UserModel.findOne({ 'authentication.token': token })

export const createUser = (data: { email: string; authentication: { password: string; salt: string } }) =>
 new UserModel(data).save().then((user) => user.toObject())

export const updateUserById = (id: string, data: { email?: string }) => UserModel.findByIdAndUpdate(id, data)

export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id)
