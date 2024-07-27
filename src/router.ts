import express from 'express'

let router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
 res.status(200)
 res.send('Hello World!')
})

// 404
router.use((req: express.Request, res: express.Response) => res.status(404).send('Not found'))

module.exports = router
