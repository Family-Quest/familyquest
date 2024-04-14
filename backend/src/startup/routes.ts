import type { Application } from 'express'
import pingRouter from '../api/ping/ping.route'

function routerSetup (app: Application) {
  app.use('/api/ping', pingRouter)
}

export default routerSetup
