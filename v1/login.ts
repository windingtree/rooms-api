import { Request, Response } from 'express'

import { genericApiMethodHandler } from '../_lib/interface'
import { postLoginPayloadValidator } from '../_lib/interface/validators'

import { authenticateClientAppUser } from '../_lib/app/auth/client_app'

import { IProfile, IProfileAuthData } from '../_lib/common/types'

async function POST(request: Request): Promise<IProfile> {
  const payload: IProfileAuthData = await postLoginPayloadValidator(request)

  return await authenticateClientAppUser(payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
