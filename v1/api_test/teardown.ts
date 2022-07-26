import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../../lib/interface'

import { authenticateApiTestRequest, apiTestTearDown } from '../../lib/app/api_test'
import { authenticateClientAppRequest } from '../../lib/app/auth/client_app'

import { IProfile, IStatus } from '../../lib/common/types'

async function POST(request: Request): Promise<IStatus> {
  await authenticateApiTestRequest(request)

  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'POST', route: 'api_test/teardown' })

  return await apiTestTearDown(requester)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
