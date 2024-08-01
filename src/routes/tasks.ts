import { Router } from 'express'

import { createTask, getUserTasks, updateTask, removeTask, getTaskById } from '../controllers/tasks.controller'

export default (router: Router) => {
 router.post('/task', createTask)
 router.get('/tasks', getUserTasks)
 router.patch('/task/:id', updateTask)
 router.delete('/task/:id', removeTask)
 router.get('/task/:id', getTaskById)
 return router
}
