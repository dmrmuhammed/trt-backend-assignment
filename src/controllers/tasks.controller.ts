import express, { Request, Response } from 'express'

import { create, read, update, remove, getById } from '../db/tasks.model'
import { ObjectId, SortOrder } from 'mongoose'

export const getUserTasks = async (req: Request, res: Response) => {
 try {
  const {
   userId,
   page = 0,
   limit = 0,
   sortField = 'createdAt',
   sortOrder = 1,
  }: { userId: ObjectId; page: number; limit: number; sortField: string; sortOrder: SortOrder } = req.body
  if (sortOrder !== 1 && sortOrder !== -1) return res.status(400).send('Invalid sort order')
  const sort: { [key: string]: SortOrder } = { [sortField]: sortOrder }
  const tasks = await read(userId, page, limit, sort)
  return res.status(200).json(tasks).end()
 } catch (error) {
  console.log('Something went wrong on getting all tasks', error)
  return res.status(500).send('Internal server error')
 }
}

export const getTaskById = async (req: Request, res: Response) => {
 try {
  const { id } = req.params
  const { userId }: { userId: ObjectId } = req.body
  const isOwner = await checkTaskOwnership(id, userId)
  if (!isOwner) return res.status(403).send('Not allowed to get this task')
  const task = await getById(id)
  if (!task) return res.status(404).send('Task not found')
  return res.status(200).json(task).end()
 } catch (error) {
  console.log('Something went wrong on getting a task by id', error)
  return res.status(500).send('Internal server error')
 }
}

export const createTask = async (req: Request, res: Response) => {
 try {
  const { userId, title, description, completed }: { userId: ObjectId; title: string; description?: string; completed?: boolean } = req.body
  if (!title) return res.status(400).send('Title is required')
  let completedAt: Date | undefined = undefined
  if (completed && completed === true) completedAt = new Date()
  const task = await create({ userId, title, description, completed, completedAt })
  return res.status(201).json(task).end()
 } catch (error) {
  console.log('Something went wrong on creating a new task', error)
  return res.status(500).send('Internal server error')
 }
}

export const updateTask = async (req: Request, res: Response) => {
 try {
  const { id } = req.params
  const { userId, title, description, completed }: { userId: ObjectId; title: string; description?: string; completed?: boolean } = req.body
  const isOwner = await checkTaskOwnership(id, userId)
  if (!isOwner) return res.status(403).send('Not allowed to update this task')
  const task = await update(id, { title, description, completed })
  return res.status(200).json(task).end()
 } catch (error) {
  console.log('Something went wrong on updating a task', error)
  return res.status(500).send('Internal server error')
 }
}

export const removeTask = async (req: Request, res: Response) => {
 try {
  const { id } = req.params
  const { userId }: { userId: ObjectId } = req.body
  const isOwner = await checkTaskOwnership(id, userId)
  if (!isOwner) return res.status(403).send('Not allowed to remove this task')
  await remove(id)
  return res.status(204).end()
 } catch (error) {
  console.log('Something went wrong on removing a task', error)
  return res.status(500).send('Internal server error')
 }
}

const checkTaskOwnership = async (id: string, userId: ObjectId) => {
 const task = await getById(id)
 if (!task || !task.userId) return false
 return task.userId.toString() === userId.toString()
}
