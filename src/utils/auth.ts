import { Auth } from '@auth/core'
import { authConfig } from '../../auth.config'

export async function getUserFromRequest(request: Request) {
  const response = await Auth(request, authConfig)
  if (!response.ok) return null

  const { user } = await response.json()
  return user
}
