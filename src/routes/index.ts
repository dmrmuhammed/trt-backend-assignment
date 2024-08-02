import { Router, Request, Response, Errback, NextFunction } from 'express'
import auth from './auth'
import tasks from './tasks'
import { checkAuthentication } from '../middlewares'

const router: Router = Router()

router.use('/auth', auth)
router.use('/tasks', checkAuthentication, tasks)

router.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
 console.error(err)
 res.status(500).send('Something went wrong!')
})

router.get('/', (req: Request, res: Response) => {
 res.send('Hello, world!')
})

export default router
