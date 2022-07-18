import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../_lib/interface'
import { postRoomTypePayloadValidator } from '../_lib/interface/validators'

import { authenticateClientAppRequest } from '../_lib/app/auth/client_app'
import { createRoomType } from '../_lib/app/room_type'

import { IProfile, IRoomType, IPostRoomTypePayload } from '../_lib/common/types'

async function POST(request: Request): Promise<IRoomType> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'POST', route: 'room_type' })

  const payload: IPostRoomTypePayload = await postRoomTypePayloadValidator(request)

  return await createRoomType(requester, payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
