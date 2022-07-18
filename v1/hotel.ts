import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../_lib/interface'
import { postHotelPayloadValidator } from '../_lib/interface/validators'

import { authenticateClientAppRequest } from '../_lib/app/auth/client_app'
import { createHotel } from '../_lib/app/hotel'

import { IProfile, IHotel, IPostHotelPayload } from '../_lib/common/types'

async function POST(request: Request): Promise<IHotel> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'POST', route: 'hotel' })

  const payload: IPostHotelPayload = await postHotelPayloadValidator(request)

  return await createHotel(requester, payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
