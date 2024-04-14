import type { Application } from 'express'

function appSetup (app: Application) {
  const PORT = process.env.BACKEND_PORT || 8000;

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${PORT}`)
  })
}

export default appSetup
