import { Router, Request, Response } from 'express'

import { createTask, getUserTasks, updateTask, removeTask, getTaskById } from '../controllers/tasks.controller'

const router: Router = Router()

router.post('/', createTask)
router.post('/all', getUserTasks)
router.patch('/:id', updateTask)
router.delete('/:id', removeTask)
router.get('/:id', getTaskById)

// Method not allowed
router.use((req: Request, res: Response) => res.status(405).send('Method not allowed'))

export default router
