import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../_lib/interface'
import { postBookingPayloadValidator } from '../_lib/interface/validators'

import { authenticateClientAppRequest } from '../_lib/app/auth/client_app'
import { createBooking } from '../_lib/app/booking'

import { IProfile, IBooking, IPostBookingPayload } from '../_lib/common/types'

async function POST(request: Request): Promise<IBooking> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'POST', route: 'booking' })

  const payload: IPostBookingPayload = await postBookingPayloadValidator(request)

  return await createBooking(requester, payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
