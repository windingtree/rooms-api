import { Request, Response } from 'express'

import { genericApiMethodHandler } from '../lib/interface'
import { postLoginPayloadValidator } from '../lib/interface/validators'

import { authenticateClientAppUser } from '../lib/app/auth/client_app'

import { IProfile, IProfileAuthData } from '../lib/common/types'

async function POST(request: Request): Promise<IProfile> {
  const payload: IProfileAuthData = await postLoginPayloadValidator(request)

  return await authenticateClientAppUser(payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
