import { Request, Response } from 'express'

import { genericApiMethodHandler } from '../lib/interface'

import { wtVerification } from '../lib/app/auth/orgid'

async function GET(): Promise<string> {
  return await wtVerification()
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET })
}
