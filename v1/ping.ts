import { Request, Response } from 'express'

import { genericApiMethodHandler } from '../lib/interface'

async function GET(): Promise<string> {
  return 'OK'
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET }, true)
}
