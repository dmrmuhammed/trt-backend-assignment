import mongoose, { SortOrder, ObjectId } from 'mongoose'

// Schema
const TaskSchema = new mongoose.Schema({
 title: { type: String, required: true },
 description: { type: String },
 completed: { type: Boolean, default: false },
 completedAt: { type: Date },
 userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now },
})

// Model
export const TaskModel = mongoose.model('Task', TaskSchema)

// Functions
export const create = (data: { title: string; description?: string; completed?: boolean; completedAt?: Date; userId: ObjectId }) =>
 new TaskModel(data).save().then((task) => task.toObject())

// export const read = (userId: ObjectId) => TaskModel.find({ userId }).then((tasks) => tasks.map((task) => task.toObject()))

export const read = (userId: ObjectId, page: number, limit: number, sort: { [key: string]: SortOrder }) =>
 TaskModel.find({ userId })
  .sort(sort)
  .skip((page - 1) * limit)
  .limit(limit)
  .then((tasks) => tasks.map((task) => task.toObject()))

export const update = (id: string, data: { title?: string; description?: string; completed?: boolean }) =>
 TaskModel.findByIdAndUpdate(id, data, { new: true })

export const remove = (id: string) => TaskModel.findByIdAndDelete(id)

export const getById = (id: string) => TaskModel.findById(id)
