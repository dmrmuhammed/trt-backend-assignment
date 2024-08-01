import mongoose from 'mongoose'

// Schema
const TaskSchema = new mongoose.Schema({
 title: { type: String, required: true },
 description: { type: String },
 completed: { type: Boolean, default: false },
 userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // TODO add required: true
})

// Model
export const TaskModel = mongoose.model('Task', TaskSchema)

// Functions
export const create = (data: { title: string; description?: string; completed: boolean; userId: string }) =>
 new TaskModel(data).save().then((task) => task.toObject())

export const read = (userId: string) => TaskModel.find({ userId }).then((tasks) => tasks.map((task) => task.toObject()))

export const update = (id: string, data: { title?: string; description?: string; completed?: boolean }) =>
 TaskModel.findByIdAndUpdate(id, data, { new: true })

export const remove = (id: string) => TaskModel.findByIdAndDelete(id)

export const getById = (id: string) => TaskModel.findById(id)
