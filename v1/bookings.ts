import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../lib/interface'

import { authenticateClientAppRequest } from '../lib/app/auth/client_app'
import { getAllBookings } from '../lib/app/booking'

import { IProfile, IBookingCollection } from '../lib/common/types'

async function GET(request: Request): Promise<IBookingCollection> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'GET', route: 'bookings' })

  return await getAllBookings(requester)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET })
}
