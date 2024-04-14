import { Router } from 'express'
import PingController from './ping.controller'
const pingRouter = Router()

const pingController = new PingController()

pingRouter.get('/', pingController.getMessage)

export default pingRouter
