import express from 'express'
import { candidatesController } from './controllers/candidates-controllers'
import { companiesController } from './controllers/companies-controllers'
import { jobsControllers } from './controllers/jobs-controllers'


const router = express.Router()

// Candidates
router.get('/candidates', candidatesController.index)
router.get('/candidates/:id', candidatesController.show)
router.post('/candidates', candidatesController.save)
router.put('/candidates/:id', candidatesController.update)
router.delete('/candidates/:id', candidatesController.delete)

// Companies
router.get('/companies', companiesController.index)
router.get('/companies/:id', companiesController.show)
router.post('/companies', companiesController.save)
router.put('/companies/:id', companiesController.update)
router.delete('/companies/:id', companiesController.delete)

// Jobs
router.get('/jobs', jobsControllers.index)
router.get('/jobs/:id', jobsControllers.show)
router.post('/jobs', jobsControllers.save)
router.put('/jobs/:id', jobsControllers.update)
router.delete('/jobs/:id', jobsControllers.delete)

export { router }