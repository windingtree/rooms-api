import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../lib/interface'
import { postProfilePayloadValidator } from '../lib/interface/validators'

import { authenticateClientAppRequest } from '../lib/app/auth/client_app'
import { createProfile } from '../lib/app/profile'

import { IProfile, IPostProfilePayload } from '../lib/common/types'

async function POST(request: Request): Promise<IProfile> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'POST', route: 'profile' })

  const payload: IPostProfilePayload = await postProfilePayloadValidator(request)

  return await createProfile(requester, payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
