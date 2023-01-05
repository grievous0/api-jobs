import express from 'express'
import { candidatesController } from './controllers/candidates-controllers'


const router = express.Router()

router.get('/candidates', candidatesController.index)
router.get('/candidates/:id', candidatesController.show)
router.post('/candidates', candidatesController.save)
router.put('/candidates/:id', candidatesController.update)
router.delete('/candidates/:id', candidatesController.delete)

export { router }