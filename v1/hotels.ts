import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../_lib/interface'

import { authenticateClientAppRequest } from '../_lib/app/auth/client_app'
import { getAllHotels } from '../_lib/app/hotel'

import { IProfile, IHotelCollection } from '../_lib/common/types'

async function GET(request: Request): Promise<IHotelCollection> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'GET', route: 'hotels' })

  return await getAllHotels(requester)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET })
}
