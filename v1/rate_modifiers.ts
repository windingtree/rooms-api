import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../lib/interface'

import { authenticateClientAppRequest } from '../lib/app/auth/client_app'
import { getAllRateModifiers } from '../lib/app/rate_modifier/'

import { IProfile, IRateModifierCollection } from '../lib/common/types'

async function GET(request: Request): Promise<IRateModifierCollection> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'GET', route: 'room_types' })

  return await getAllRateModifiers(requester)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET })
}
