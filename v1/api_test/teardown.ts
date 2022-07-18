import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../../_lib/interface'

import { authenticateApiTestRequest, apiTestTearDown } from '../../_lib/app/api_test'
import { authenticateClientAppRequest } from '../../_lib/app/auth/client_app'

import { IProfile, IStatus } from '../../_lib/common/types'

async function POST(request: Request): Promise<IStatus> {
  await authenticateApiTestRequest(request)

  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'POST', route: 'api_test/teardown' })

  return await apiTestTearDown(requester)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
