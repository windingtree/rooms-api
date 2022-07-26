import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../lib/interface'
import { postRoomTypePayloadValidator } from '../lib/interface/validators'

import { authenticateClientAppRequest } from '../lib/app/auth/client_app'
import { createRoomType } from '../lib/app/room_type'

import { IProfile, IRoomType, IPostRoomTypePayload } from '../lib/common/types'

async function POST(request: Request): Promise<IRoomType> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'POST', route: 'room_type' })

  const payload: IPostRoomTypePayload = await postRoomTypePayloadValidator(request)

  return await createRoomType(requester, payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
