import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest, getQueryParamValue } from '../../lib/interface'
import { patchHotelPayloadValidator } from '../../lib/interface/validators'

import { authenticateClientAppRequest } from '../../lib/app/auth/client_app'
import { getHotel, updateHotel, deleteHotel } from '../../lib/app/hotel'

import { IProfile, IHotel, IPatchHotelPayload, IStatus } from '../../lib/common/types'

async function GET(request: Request): Promise<IHotel> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'GET', route: 'hotel/{id}' })

  const hotelId: string = getQueryParamValue(request, 'hotel_id')

  return await getHotel(requester, hotelId)
}

async function PATCH(request: Request): Promise<IHotel> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'PATCH', route: 'hotel/{id}' })

  const hotelId: string = getQueryParamValue(request, 'hotel_id')

  const payload: IPatchHotelPayload = await patchHotelPayloadValidator(request)

  return await updateHotel(requester, hotelId, payload)
}

async function DELETE(request: Request): Promise<IStatus> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'DELETE', route: 'hotel/{id}' })

  const hotelId: string = getQueryParamValue(request, 'hotel_id')

  return await deleteHotel(requester, hotelId)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET, PATCH, DELETE })
}
