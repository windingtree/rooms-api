import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest, getQueryParamValue } from '../../lib/interface'
import { patchRateModifierPayloadValidator } from '../../lib/interface/validators'

import { authenticateClientAppRequest } from '../../lib/app/auth/client_app'
import { getRateModifier, updateRateModifier, deleteRateModifier } from '../../lib/app/rate_modifier'

import { IProfile, IRateModifier, IPatchRateModifierPayload, IStatus } from '../../lib/common/types'

async function GET(request: Request): Promise<IRateModifier> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'GET', route: 'rate_modifier/{id}' })

  const rateModifierId: string = getQueryParamValue(request, 'rate_modifier_id')

  return await getRateModifier(requester, rateModifierId)
}

async function PATCH(request: Request): Promise<IRateModifier> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'PATCH', route: 'rate_modifier/{id}' })

  const rateModifierId: string = getQueryParamValue(request, 'rate_modifier_id')

  const payload: IPatchRateModifierPayload = await patchRateModifierPayloadValidator(request)

  return await updateRateModifier(requester, rateModifierId, payload)
}

async function DELETE(request: Request): Promise<IStatus> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'DELETE', route: 'rate_modifier/{id}' })

  const roomTypeId: string = getQueryParamValue(request, 'rate_modifier_id')

  return await deleteRateModifier(requester, roomTypeId)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET, PATCH, DELETE })
}
