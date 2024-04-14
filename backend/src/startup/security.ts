import cors from 'cors'
import type { Application } from 'express'

function securitySetup (app: Application, express: any) {
  return app
    .use(cors())
    .use(express.json())
}

export default securitySetup
