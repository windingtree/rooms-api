import { Request, Response } from 'express'

import { genericApiMethodHandler } from '../../_lib/interface'

import { authenticateApiTestRequest, apiTestSetup } from '../../_lib/app/api_test'

import { IProfile } from '../../_lib/common/types'

async function POST(request: Request): Promise<IProfile> {
  await authenticateApiTestRequest(request)

  return await apiTestSetup()
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
