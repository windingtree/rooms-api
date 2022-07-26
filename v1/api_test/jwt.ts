import { Request, Response } from 'express'

import { genericApiMethodHandler } from '../../lib/interface'
import { postJwtPayloadValidator } from '../../lib/interface/validators'

import { authenticateApiTestRequest, generateJwtToken } from '../../lib/app/api_test'

import { IProfileAuthData, IJwtToken } from '../../lib/common/types'

async function POST(request: Request): Promise<IJwtToken> {
  await authenticateApiTestRequest(request)

  const payload: IProfileAuthData = await postJwtPayloadValidator(request)

  return await generateJwtToken(payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
