import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../lib/interface'

import { authenticateClientAppRequest } from '../lib/app/auth/client_app'
import { getAllRoomTypes } from '../lib/app/room_type'

import { IProfile, IRoomTypeCollection } from '../lib/common/types'

async function GET(request: Request): Promise<IRoomTypeCollection> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'GET', route: 'room_types' })

  return await getAllRoomTypes(requester)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET })
}
