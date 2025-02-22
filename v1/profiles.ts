import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../lib/interface'

import { authenticateClientAppRequest } from '../lib/app/auth/client_app'
import { getAllProfiles } from '../lib/app/profile'

import { IProfile, IProfileCollection } from '../lib/common/types'

async function GET(request: Request): Promise<IProfileCollection> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'GET', route: 'profiles' })

  return await getAllProfiles(requester)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET })
}
