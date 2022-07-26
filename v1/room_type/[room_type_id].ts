import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest, getQueryParamValue } from '../../lib/interface'
import { patchRoomTypePayloadValidator } from '../../lib/interface/validators'

import { authenticateClientAppRequest } from '../../lib/app/auth/client_app'
import { getRoomType, updateRoomType, deleteRoomType } from '../../lib/app/room_type'

import { IProfile, IRoomType, IPatchRoomTypePayload, IStatus } from '../../lib/common/types'

async function GET(request: Request): Promise<IRoomType> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'GET', route: 'room_type/{id}' })

  const roomTypeId: string = getQueryParamValue(request, 'room_type_id')

  return await getRoomType(requester, roomTypeId)
}

async function PATCH(request: Request): Promise<IRoomType> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'PATCH', route: 'room_type/{id}' })

  const roomTypeId: string = getQueryParamValue(request, 'room_type_id')

  const payload: IPatchRoomTypePayload = await patchRoomTypePayloadValidator(request)

  return await updateRoomType(requester, roomTypeId, payload)
}

async function DELETE(request: Request): Promise<IStatus> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'DELETE', route: 'room_type/{id}' })

  const roomTypeId: string = getQueryParamValue(request, 'room_type_id')

  return await deleteRoomType(requester, roomTypeId)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET, PATCH, DELETE })
}
