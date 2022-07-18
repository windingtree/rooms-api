import { Request, Response } from 'express'

import { genericApiMethodHandler } from '../_lib/interface'
import { postOneTimePasswordPayloadValidator } from '../_lib/interface/validators'

import { generateOneTimePassword } from '../_lib/app/auth/client_app'

import { IOneTimePasswordPayload, IOtpStatus } from '../_lib/common/types'

async function POST(request: Request): Promise<IOtpStatus> {
  const payload: IOneTimePasswordPayload = await postOneTimePasswordPayloadValidator(request)

  return await generateOneTimePassword(payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
