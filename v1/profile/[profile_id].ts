import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest, getQueryParamValue } from '../../_lib/interface'
import { patchProfilePayloadValidator } from '../../_lib/interface/validators'

import { authenticateClientAppRequest } from '../../_lib/app/auth/client_app'
import { getProfile, updateProfile, deleteProfile } from '../../_lib/app/profile'

import { IProfile, IPatchProfilePayload, IStatus } from '../../_lib/common/types'

async function GET(request: Request): Promise<IProfile> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'GET', route: 'profile/{id}' })

  const profileId: string = getQueryParamValue(request, 'profile_id')

  return await getProfile(requester, profileId)
}

async function PATCH(request: Request): Promise<IProfile> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'PATCH', route: 'profile/{id}' })

  const profileId: string = getQueryParamValue(request, 'profile_id')

  const payload: IPatchProfilePayload = await patchProfilePayloadValidator(request)

  return await updateProfile(requester, profileId, payload)
}

async function DELETE(request: Request): Promise<IStatus> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'DELETE', route: 'profile/{id}' })

  const profileId: string = getQueryParamValue(request, 'profile_id')

  return await deleteProfile(requester, profileId)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET, PATCH, DELETE })
}
