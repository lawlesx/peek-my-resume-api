import { Elysia } from 'elysia'
import { existsSync, mkdirSync } from 'fs'
import { getUserFromRequest } from './utils/auth'

const uploadsDir = './.uploads'

if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir)
}

const app = new Elysia()
  .get('/', () => 'Hello Elysia!')
  .post('/upload', async ({ request }) => {
    const user = await getUserFromRequest(request)
    if (!user) return new Response('Unauthorized', { status: 401 })

    const form = await request.formData()
    const file = form.get('resume') as File

    if (!file || !(file instanceof File)) {
      return { error: 'No file uploaded' }
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    await Bun.write(`${uploadsDir}/${file.name}`, buffer)

    return { message: `Uploaded ${file.name}` }
  })
  .listen(8000)

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
