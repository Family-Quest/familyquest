import { Router } from 'express'
import TutorController from './tutor.controller'
const tutorRouter = Router()

const pingController = new TutorController()

tutorRouter.get('/', pingController.getTutorByUser)
tutorRouter.get('/:tutorId', pingController.getTutorById)

export default tutorRouter
