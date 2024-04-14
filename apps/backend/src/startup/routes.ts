import type { Application } from 'express'
import tutorRouter from '../api/tutor/tutor.route'

function routerSetup (app: Application) {
  app.use('/api/tutor', tutorRouter)
}

export default routerSetup
