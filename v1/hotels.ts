import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../lib/interface'

import { authenticateClientAppRequest } from '../lib/app/auth/client_app'
import { getAllHotels } from '../lib/app/hotel'

import { IProfile, IHotelCollection } from '../lib/common/types'

async function GET(request: Request): Promise<IHotelCollection> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'GET', route: 'hotels' })

  return await getAllHotels(requester)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET })
}
