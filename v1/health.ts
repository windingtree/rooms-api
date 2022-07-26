import { Request, Response } from 'express'

import { genericApiMethodHandler } from '../lib/interface'

import { getHealth } from '../lib/app/health'

import { IHealthStatus } from '../lib/common/types'

async function GET(): Promise<IHealthStatus> {
  return await getHealth()
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET })
}
