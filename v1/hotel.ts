import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../lib/interface'
import { postHotelPayloadValidator } from '../lib/interface/validators'

import { authenticateClientAppRequest } from '../lib/app/auth/client_app'
import { createHotel } from '../lib/app/hotel'

import { IProfile, IHotel, IPostHotelPayload } from '../lib/common/types'

async function POST(request: Request): Promise<IHotel> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'POST', route: 'hotel' })

  const payload: IPostHotelPayload = await postHotelPayloadValidator(request)

  return await createHotel(requester, payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
