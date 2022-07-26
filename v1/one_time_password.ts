import { Request, Response } from 'express'

import { genericApiMethodHandler } from '../lib/interface'
import { postOneTimePasswordPayloadValidator } from '../lib/interface/validators'

import { generateOneTimePassword } from '../lib/app/auth/client_app'

import { IOneTimePasswordPayload, IOtpStatus } from '../lib/common/types'

async function POST(request: Request): Promise<IOtpStatus> {
  const payload: IOneTimePasswordPayload = await postOneTimePasswordPayloadValidator(request)

  return await generateOneTimePassword(payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
