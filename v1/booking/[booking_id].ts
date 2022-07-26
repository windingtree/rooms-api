import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest, getQueryParamValue } from '../../lib/interface'
import { patchBookingPayloadValidator } from '../../lib/interface/validators'

import { authenticateClientAppRequest } from '../../lib/app/auth/client_app'
import { getBooking, updateBooking, deleteBooking } from '../../lib/app/booking'

import { IProfile, IBooking, IPatchBookingPayload, IStatus } from '../../lib/common/types'

async function GET(request: Request): Promise<IBooking> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'GET', route: 'booking/{id}' })

  const bookingId: string = getQueryParamValue(request, 'booking_id')

  return await getBooking(requester, bookingId)
}

async function PATCH(request: Request): Promise<IBooking> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'PATCH', route: 'booking/{id}' })

  const bookingId: string = getQueryParamValue(request, 'booking_id')

  const payload: IPatchBookingPayload = await patchBookingPayloadValidator(request)

  return await updateBooking(requester, bookingId, payload)
}

async function DELETE(request: Request): Promise<IStatus> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'DELETE', route: 'booking/{id}' })

  const bookingId: string = getQueryParamValue(request, 'booking_id')

  return await deleteBooking(requester, bookingId)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET, PATCH, DELETE })
}
